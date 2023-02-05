/* eslint-disable import/no-cycle */
import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";

import { CustomBaseEntity } from "./CustomBaseEntity";
import { Workout } from "./Workout";

@Entity()
export class User extends CustomBaseEntity {
    @Property()
    username!: string;

    @Property()
    mail!: string;

    @Property({ hidden: true })
    passwordHash!: string;

    @OneToMany(() => Workout, (workout) => workout.user)
    workouts = new Collection<Workout>(this);
}
