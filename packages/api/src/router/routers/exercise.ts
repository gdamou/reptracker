import { publicProcedure, router } from "../trpc";

export const exerciseRouter = router({
    list: publicProcedure.query(() => {
        // [..]
        return [];
    }),
});
