import { router } from "../trpc";
import { categoryRouter } from "./category";
import { exerciseRouter } from "./exercise";
import { supersetRouter } from "./superset";
import { userRouter } from "./user";
import { workoutRouter } from "./workout";

export const appRouter = router({
    category: categoryRouter,
    exercise: exerciseRouter,
    superset: supersetRouter,
    workout: workoutRouter,
    user: userRouter,
});

// eslint-disable-next-line import/no-unused-modules
export type AppRouter = typeof appRouter;
