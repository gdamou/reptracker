import { router } from "../trpc";
import { categoryRouter } from "./category";
import { exerciseRouter } from "./exercise";
import { supersetRouter } from "./superset";

export const appRouter = router({
    category: categoryRouter,
    exercise: exerciseRouter,
    superset: supersetRouter,
});

export type AppRouter = typeof appRouter;
