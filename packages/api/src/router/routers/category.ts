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
                name: z.string(),
            })
        )
        .mutation(({ input, ctx }) => {
            const fork = ctx.orm.em.fork();
            return fork.create(Category, input);
        }),
});
