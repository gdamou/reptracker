/* eslint-disable import/no-cycle */
import { Collection, Entity, ManyToMany, Property } from "@mikro-orm/core";

import { Category } from "./Category";
import { CustomBaseEntity } from "./CustomBaseEntity";
import { Superset } from "./Superset";
import { Workout } from "./Workout";

@Entity()
export class Exercise extends CustomBaseEntity {
    @Property()
    name!: string;

    @ManyToMany({ entity: () => Category, mappedBy: "exercises" })
    categories: Collection<Category> = new Collection<Category>(this);

    @ManyToMany({ entity: () => Workout, mappedBy: (workout) => workout.exercises, nullable: true })
    workouts: Collection<Workout> = new Collection<Workout>(this);

    @ManyToMany({ entity: () => Superset, inversedBy: "exercises", nullable: true })
    supersets = new Collection<Superset>(this);
}
