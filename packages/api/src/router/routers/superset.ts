import { wrap } from "@mikro-orm/core";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { Exercise } from "../../entities/Exercise";
import { Superset } from "../../entities/Superset";
import { publicProcedure, router } from "../trpc";

export const supersetRouter = router({
    list: publicProcedure.query(({ ctx }) => {
        return ctx.orm.find(Superset, {});
    }),
    byId: publicProcedure
        .input(
            z.object({
                id: z.string().uuid(),
            })
        )
        .query(async ({ input, ctx }) => {
            const foundSuperset = await ctx.orm.findOne(Superset, { id: input.id }, { populate: ["exercises"] });

            if (!foundSuperset) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `superset "${input.id}" not found`,
                });
            }

            return foundSuperset;
        }),
    create: publicProcedure
        .input(
            z.object({
                name: z.string().nonempty(),
                exercisesIds: z.string().uuid().array().min(2),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const foundSuperset = await ctx.orm.findOne(Superset, { name: input.name });

            if (foundSuperset) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: `superset with name "${input.name}" already exist`,
                });
            }

            const foundExercises = await ctx.orm.find(Exercise, { id: input.exercisesIds });

            const createdSuperset = ctx.orm.create(Superset, { name: input.name, exercises: foundExercises });

            await ctx.orm.flush();

            return {
                status: "success",
                data: createdSuperset,
            };
        }),
    update: publicProcedure
        .input(
            z.object({
                id: z.string().uuid(),
                name: z.string().optional(),
                exercisesIds: z.string().uuid().array().optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const foundSuperset = await ctx.orm.findOne(Superset, { id: input.id });

            if (!foundSuperset) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `superset "${input.id}" not found`,
                });
            }

            wrap(foundSuperset).assign(input);

            await ctx.orm.flush();

            return {
                status: "success",
                data: foundSuperset,
            };
        }),
    remove: publicProcedure.input(z.object({ id: z.string().uuid() })).mutation(async ({ input, ctx }) => {
        const foundSuperset = await ctx.orm.findOne(Superset, { id: input.id });

        if (!foundSuperset) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `superset "${input.id}" not found`,
            });
        }

        await ctx.orm.removeAndFlush(foundSuperset);
        return {
            status: "success",
            data: null,
        };
    }),
});
