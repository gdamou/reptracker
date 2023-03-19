import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { Category } from "../../entities/Category";
import { Exercise } from "../../entities/Exercise";
import { publicProcedure, router } from "../trpc";

export const exerciseRouter = router({
    list: publicProcedure.query(({ ctx }) => {
        return ctx.orm.find(Exercise, {}, { populate: ["categories"] });
    }),
    byId: publicProcedure
        .input(
            z.object({
                id: z.string().uuid(),
            })
        )
        .query(async ({ input, ctx }) => {
            const foundExercise = await ctx.orm.findOne(Exercise, { id: input.id }, { populate: ["categories"] });

            if (!foundExercise) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `exercise "${input.id}" not found`,
                });
            }

            return foundExercise;
        }),
    create: publicProcedure
        .input(
            z.object({
                name: z.string().nonempty(),
                categoriesIds: z.string().uuid().array(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const foundExercise = await ctx.orm.findOne(Exercise, { name: input.name });

            if (foundExercise) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: `exercise with name "${input.name}" already exist`,
                });
            }

            const foundCategories = await ctx.orm.find(Category, input.categoriesIds);

            const createdExercise = ctx.orm.create(Exercise, { name: input.name, categories: foundCategories });

            await ctx.orm.flush();

            return {
                status: "success",
                data: createdExercise,
            };
        }),
    remove: publicProcedure.input(z.object({ id: z.string().uuid() })).mutation(async ({ input, ctx }) => {
        const foundExercise = await ctx.orm.findOne(Exercise, { id: input.id });

        if (!foundExercise) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `exercise "${input.id}" not found`,
            });
        }

        await ctx.orm.removeAndFlush(foundExercise);
        return {
            status: "success",
            data: null,
        };
    }),
});
