/* eslint-disable import/no-cycle */
import { BeforeCreate, BeforeUpdate, Collection, Entity, ManyToMany, ManyToOne, Property } from "@mikro-orm/core";

import { CustomBaseEntity } from "./CustomBaseEntity";
import { Exercise } from "./Exercise";
import { Superset } from "./Superset";
import { User } from "./User";
import { WorkoutExercise } from "./WorkoutExercise";
import { WorkoutSuperset } from "./WorkoutSuperset";

@Entity()
export class Workout extends CustomBaseEntity {
    @Property()
    name!: string;

    @ManyToOne()
    user!: User;

    @ManyToMany({ entity: () => Exercise, pivotEntity: () => WorkoutExercise, owner: true, nullable: true })
    exercises = new Collection<Exercise>(this);

    @ManyToMany({ entity: () => Superset, pivotEntity: () => WorkoutSuperset, owner: true, nullable: true })
    supersets = new Collection<Superset>(this);

    @BeforeCreate()
    @BeforeUpdate()
    validate() {
        if (this.exercises && this.supersets) {
            throw new Error("Cannot have both 'exercise' and 'superset' defined");
        } else if (!this.exercises && !this.supersets) {
            throw new Error("Either 'exercise' or 'superset' must be defined");
        }
    }
}
