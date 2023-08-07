import { z } from "zod";

import { User } from "../../entities/User";
import { publicProcedure, router } from "../trpc";

export const userRouter = router({
    list: publicProcedure.query(({ ctx }) => {
        return ctx.orm.find(User, {});
    }),
    create: publicProcedure
        .input(
            z.object({
                username: z.string().nonempty(),
                mail: z.string().email(),
                passwordHash: z.string().nonempty(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const createdUser = ctx.orm.create(User, { workouts: [], ...input });
            await ctx.orm.flush();
            return {
                status: "success",
                data: createdUser,
            };
        }),
});
