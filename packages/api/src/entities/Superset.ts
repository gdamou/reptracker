/* eslint-disable import/no-cycle */
import { Collection, Entity, ManyToMany, Property } from "@mikro-orm/core";

import { CustomBaseEntity } from "./CustomBaseEntity";
import { Exercise } from "./Exercise";
import { Workout } from "./Workout";

@Entity()
export class Superset extends CustomBaseEntity {
    @Property()
    name!: string;

    @ManyToMany({ entity: () => Exercise, mappedBy: (exercise) => exercise.supersets })
    exercises = new Collection<Superset>(this);

    @ManyToMany({ entity: () => Workout, mappedBy: (workout) => workout.supersets })
    workouts: Collection<Workout> = new Collection<Workout>(this);
}
