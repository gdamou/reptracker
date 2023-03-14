import { router } from "../trpc";
import { categoryRouter } from "./category";
import { exerciseRouter } from "./exercise";

export const appRouter = router({
    category: categoryRouter,
    exercise: exerciseRouter,
});

export type AppRouter = typeof appRouter;
