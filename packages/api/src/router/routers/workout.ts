import type { SqlEntityManager } from "@mikro-orm/postgresql";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { Exercise } from "../../entities/Exercise";
import { Superset } from "../../entities/Superset";
import { User } from "../../entities/User";
import { Workout } from "../../entities/Workout";
import { WorkoutExercise } from "../../entities/WorkoutExercise";
import { WorkoutSuperset } from "../../entities/WorkoutSuperset";
import { publicProcedure, router } from "../trpc";

export const workoutRouter = router({
    list: publicProcedure.query(({ ctx }) => {
        return ctx.orm.find(Workout, {});
    }),
    byId: publicProcedure
        .input(
            z.object({
                id: z.string().uuid(),
            })
        )
        .query(({ ctx, input }) => {
            return ctx.orm.findOneOrFail(Workout, { id: input.id });
        }),
    create: publicProcedure
        .input(
            z.object({
                name: z.string().nonempty(),
                userId: z.string().uuid(),
                exercises: z
                    .object({
                        id: z.string().uuid(),
                        sets: z.number().int().min(1).max(10),
                        repetitions: z.number().int().min(1).max(30),
                    })
                    .array()
                    .optional(),
                supersets: z
                    .object({
                        id: z.string().uuid(),
                        sets: z.number().int().min(1).max(10),
                        repetitions: z.number().int().min(1).max(30),
                    })
                    .array()
                    .optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const foundUser = await ctx.orm.findOne(User, { id: input.userId });

            if (!foundUser) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `user "${input.userId}" not found`,
                });
            }

            const createdWorkout = new Workout();
            createdWorkout.name = input.name;
            createdWorkout.user = foundUser;

            if (input.exercises && input.exercises.length > 0) {
                input.exercises.forEach(async (exercise) => {
                    const createdWorkoutExercise = await createWorkoutElement(ctx.orm, {
                        type: "exercise",
                        workout: createdWorkout,
                        elementId: exercise.id,
                        ...exercise,
                    });
                    createdWorkout.exercises.add(createdWorkoutExercise as WorkoutExercise);
                });
            }

            if (input.supersets && input.supersets.length > 0) {
                input.supersets.forEach(async (superset) => {
                    const createdWorkoutSuperset = await createWorkoutElement(ctx.orm, {
                        type: "superset",
                        workout: createdWorkout,
                        elementId: superset.id,
                        ...superset,
                    });
                    createdWorkout.supersets.add(createdWorkoutSuperset as WorkoutSuperset);
                });
            }

            await ctx.orm.persistAndFlush([createdWorkout]);
            return {
                status: "success",
                data: createdWorkout,
            };
        }),
});

type CreateWorkoutElementOptions = {
    type: "exercise" | "superset";
    workout: Workout;
    elementId: string;
    sets: number;
    repetitions: number;
};

const createWorkoutElement = async (
    em: SqlEntityManager,
    options: CreateWorkoutElementOptions
): Promise<WorkoutExercise | WorkoutSuperset> => {
    const { type, workout, elementId, sets, repetitions } = options;

    const element = await (type === "exercise"
        ? em.findOne(Exercise, { id: elementId })
        : em.findOne(Superset, { id: elementId }));

    if (!element) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: `${type} "${elementId}" not found`,
        });
    }

    const createdWorkoutElement =
        type === "exercise"
            ? new WorkoutExercise(workout, element as Exercise, sets, repetitions)
            : new WorkoutSuperset(workout, element as Superset, sets, repetitions);

    await em.persistAndFlush(createdWorkoutElement);
    return createdWorkoutElement;
};
