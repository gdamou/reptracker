/* eslint-disable import/no-cycle */
import { Collection, Entity, ManyToMany, OneToMany, Property } from "@mikro-orm/core";

import { Category } from "./Category";
import { CustomBaseEntity } from "./CustomBaseEntity";
import { Superset } from "./Superset";
import { WorkoutExercise } from "./WorkoutExercise";

@Entity()
export class Exercise extends CustomBaseEntity {
    @Property()
    name!: string;

    @ManyToMany({ entity: () => Category, mappedBy: "exercises" })
    categories: Collection<Category> = new Collection<Category>(this);

    @OneToMany(() => WorkoutExercise, (workoutExercise) => workoutExercise.exercise)
    workouts = new Collection<WorkoutExercise>(this);

    @ManyToMany({ entity: () => Superset, inversedBy: "exercises", nullable: true })
    supersets = new Collection<Superset>(this);
}
