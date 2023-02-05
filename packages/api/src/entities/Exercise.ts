/* eslint-disable import/no-cycle */
import { Collection, Entity, ManyToMany, Property } from "@mikro-orm/core";

import { Category } from "./Category";
import { CustomBaseEntity } from "./CustomBaseEntity";
import { ExerciseSuperset } from "./ExerciseSuperset";
import { Superset } from "./Superset";
import { Workout } from "./Workout";

@Entity()
export class Exercise extends CustomBaseEntity {
    @Property()
    name!: string;

    @ManyToMany({ entity: () => Category, mappedBy: (category) => category.exercises })
    categories: Collection<Category> = new Collection<Category>(this);

    @ManyToMany({ entity: () => Workout, mappedBy: (workout) => workout.exercises })
    workouts: Collection<Workout> = new Collection<Workout>(this);

    @ManyToMany({ entity: () => Superset, pivotEntity: () => ExerciseSuperset, owner: true, nullable: true })
    supersets = new Collection<Superset>(this);
}
