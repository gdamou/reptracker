/* eslint-disable import/no-cycle */
import { Entity, ManyToOne } from "@mikro-orm/core";

import { Category } from "./Category";
import { CustomBaseEntity } from "./CustomBaseEntity";
import { Exercise } from "./Exercise";

@Entity()
export class CategoryExercise extends CustomBaseEntity {
    @ManyToOne({ primary: true })
    exercise!: Exercise;
    @ManyToOne({ primary: true })
    category!: Category;
}
