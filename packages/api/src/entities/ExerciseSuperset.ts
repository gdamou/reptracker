/* eslint-disable import/no-cycle */
import { Entity, ManyToOne } from "@mikro-orm/core";

import { CustomBaseEntity } from "./CustomBaseEntity";
import { Exercise } from "./Exercise";
import { Superset } from "./Superset";

@Entity()
export class ExerciseSuperset extends CustomBaseEntity {
    @ManyToOne({ primary: true })
    exercise!: Exercise;
    @ManyToOne({ primary: true })
    superset!: Superset;
}
