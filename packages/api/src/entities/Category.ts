/* eslint-disable import/no-cycle */
import { Collection, Entity, ManyToMany, Property } from "@mikro-orm/core";

import { CustomBaseEntity } from "./CustomBaseEntity";
import { Exercise } from "./Exercise";

@Entity()
export class Category extends CustomBaseEntity {
    @Property()
    name!: string;

    @ManyToMany({ entity: () => Exercise, inversedBy: "categories" })
    exercises = new Collection<Exercise>(this);
}
