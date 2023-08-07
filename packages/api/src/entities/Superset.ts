/* eslint-disable import/no-cycle */
import { Collection, Entity, ManyToMany, OneToMany, Property } from "@mikro-orm/core";

import { CustomBaseEntity } from "./CustomBaseEntity";
import { Exercise } from "./Exercise";
import { WorkoutSuperset } from "./WorkoutSuperset";

@Entity()
export class Superset extends CustomBaseEntity {
    @Property()
    name!: string;

    @ManyToMany({ entity: () => Exercise, mappedBy: (exercise) => exercise.supersets })
    exercises = new Collection<Superset>(this);

    @OneToMany(() => WorkoutSuperset, (workoutSuperset) => workoutSuperset.superset)
    workouts = new Collection<WorkoutSuperset>(this);
}
