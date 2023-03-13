import { Exercise } from "../../entities/Exercise";
import { publicProcedure, router } from "../trpc";

export const exerciseRouter = router({
    list: publicProcedure.query(({ ctx }) => {
        // [..]
        const fork = ctx.orm.em.fork();
        return fork.find(Exercise, {});
    }),
});
