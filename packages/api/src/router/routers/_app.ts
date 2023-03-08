import { router } from "../trpc";
import { exerciseRouter } from "./exercise";

export const appRouter = router({
    exercise: exerciseRouter,
});
