/* eslint-disable import/no-cycle */
import { Collection, Entity, ManyToOne, OneToMany, Property } from "@mikro-orm/core";

import { CustomBaseEntity } from "./CustomBaseEntity";
import { Exercise } from "./Exercise";
import { Result } from "./Result";
import { Workout } from "./Workout";

@Entity()
export class WorkoutExercise extends CustomBaseEntity {
    @ManyToOne({ primary: true })
    workout!: Workout;

    @ManyToOne({ primary: true })
    exercise!: Exercise;

    @Property({ default: 4 })
    sets!: number;

    @Property({ default: 8 })
    repetitions!: number;

    @OneToMany(() => Result, (result) => result.workoutExercise)
    results = new Collection<Result>(this);

    constructor(workout: Workout, exercise: Exercise, sets: number, repetitions: number) {
        super();
        this.workout = workout;
        this.exercise = exercise;
        this.sets = sets;
        this.repetitions = repetitions;
    }
}
