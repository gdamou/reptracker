import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { Exercise } from "../../entities/Exercise";
import { publicProcedure, router } from "../trpc";

export const exerciseRouter = router({
    list: publicProcedure.query(({ ctx }) => {
        return ctx.orm.find(Exercise, {});
    }),
    byId: publicProcedure
        .input(
            z.object({
                id: z.string().uuid(),
            })
        )
        .query(async ({ input, ctx }) => {
            const foundExercise = await ctx.orm.find(Exercise, { id: input.id });

            if (!foundExercise)
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `exercise "${input.id}" not found`,
                });

            return foundExercise;
        }),
    // create: publicProcedure
    //     .input(
    //         z.object({
    //             name: z.string().nonempty(),
    //             categoriesIds: z.string().uuid().array(),
    //         })
    //     )
    //     .mutation(async ({ input, ctx }) => {
    //         const foundCategories =  ctx.orm.find(Category, input.categoriesIds);

    //         ctx.orm.
    //     }),
});
