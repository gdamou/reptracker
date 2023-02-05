/* eslint-disable import/no-cycle */
import { BeforeCreate, BeforeUpdate, Entity, ManyToOne, Property } from "@mikro-orm/core";

import { CustomBaseEntity } from "./CustomBaseEntity";
import { WorkoutExercise } from "./WorkoutExercise";
import { WorkoutSuperset } from "./WorkoutSuperset";

@Entity()
export class Result extends CustomBaseEntity {
    @Property()
    sets!: number;

    @Property()
    repetitions!: number;

    @ManyToOne({ nullable: true })
    workoutExercise!: WorkoutExercise;

    @ManyToOne({ nullable: true })
    workoutSuperset!: WorkoutSuperset;

    @BeforeCreate()
    @BeforeUpdate()
    validate() {
        if (this.workoutExercise && this.workoutSuperset) {
            throw new Error("Cannot have both 'workoutExercise' and 'workoutSuperset' defined");
        } else if (!this.workoutExercise && !this.workoutSuperset) {
            throw new Error("Either 'workoutExercise' or 'workoutSuperset' must be defined");
        }
    }
}
