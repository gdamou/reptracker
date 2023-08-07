/* eslint-disable import/no-cycle */
import { BeforeCreate, BeforeUpdate, Collection, Entity, ManyToOne, OneToMany, Property } from "@mikro-orm/core";

import { CustomBaseEntity } from "./CustomBaseEntity";
import { User } from "./User";
import { WorkoutExercise } from "./WorkoutExercise";
import { WorkoutSuperset } from "./WorkoutSuperset";

@Entity()
export class Workout extends CustomBaseEntity {
    @Property()
    name!: string;

    @ManyToOne()
    user!: User;

    @OneToMany(() => WorkoutExercise, (workoutExercise) => workoutExercise.workout)
    exercises = new Collection<WorkoutExercise>(this);

    @OneToMany(() => WorkoutSuperset, (workoutSuperset) => workoutSuperset.workout)
    supersets = new Collection<WorkoutSuperset>(this);

    @BeforeCreate()
    @BeforeUpdate()
    validate() {
        if (!this.exercises && !this.supersets) {
            throw new Error("Either 'exercise' or 'superset' must be defined");
        }
    }
}
