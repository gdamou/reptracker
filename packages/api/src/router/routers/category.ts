import { wrap } from "@mikro-orm/core";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { Category } from "../../entities/Category";
import { publicProcedure, router } from "../trpc";

export const categoryRouter = router({
    list: publicProcedure.query(({ ctx }) => {
        const fork = ctx.orm.em.fork();
        return fork.find(Category, {});
    }),
    add: publicProcedure
        .input(
            z.object({
                name: z.string().nonempty(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const fork = ctx.orm.em.fork();
            const createdCategory = fork.create(Category, input);
            await fork.flush();
            return createdCategory;
        }),
    remove: publicProcedure
        .input(
            z.object({
                id: z.string().nonempty(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const fork = ctx.orm.em.fork();
            const foundCategory = await fork.findOne(Category, { id: input.id });

            if (!foundCategory)
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `category "${input.id}" not found`,
                });

            await fork.removeAndFlush(foundCategory);
            return {
                status: "success",
                data: null,
            };
        }),
    changeName: publicProcedure
        .input(
            z.object({
                id: z.string().nonempty(),
                name: z.string().nonempty(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const fork = ctx.orm.em.fork();
            const foundCategory = await fork.findOne(Category, { id: input.id });

            if (!foundCategory)
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `category "${input.id}" not found`,
                });

            wrap(foundCategory).assign({
                name: input.name,
            });

            await fork.flush();

            return {
                status: "success",
                data: foundCategory,
            };
        }),
});
