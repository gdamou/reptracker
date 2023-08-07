import { wrap } from "@mikro-orm/core";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { Category } from "../../entities/Category";
import { publicProcedure, router } from "../trpc";

export const categoryRouter = router({
    list: publicProcedure.query(({ ctx }) => {
        return ctx.orm.find(Category, {});
    }),
    create: publicProcedure
        .input(
            z.object({
                name: z.string().nonempty(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const createdCategory = ctx.orm.create(Category, input);
            await ctx.orm.flush();
            return {
                status: "success",
                data: createdCategory,
            };
        }),
    remove: publicProcedure
        .input(
            z.object({
                id: z.string().uuid(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const foundCategory = await ctx.orm.findOne(Category, { id: input.id });

            if (!foundCategory) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `category "${input.id}" not found`,
                });
            }

            await ctx.orm.removeAndFlush(foundCategory);
            return {
                status: "success",
                data: null,
            };
        }),
    changeName: publicProcedure
        .input(
            z.object({
                id: z.string().uuid(),
                name: z.string().nonempty(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const foundCategory = await ctx.orm.findOne(Category, { id: input.id });

            if (!foundCategory) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `category "${input.id}" not found`,
                });
            }

            wrap(foundCategory).assign({
                name: input.name,
            });

            await ctx.orm.flush();

            return {
                status: "success",
                data: foundCategory,
            };
        }),
});
