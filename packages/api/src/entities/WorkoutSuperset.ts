/* eslint-disable import/no-cycle */
import { Collection, Entity, ManyToOne, OneToMany, Property } from "@mikro-orm/core";

import { CustomBaseEntity } from "./CustomBaseEntity";
import { Result } from "./Result";
import { Superset } from "./Superset";
import { Workout } from "./Workout";

@Entity()
export class WorkoutSuperset extends CustomBaseEntity {
    @ManyToOne({ primary: true })
    workout!: Workout;

    @ManyToOne({ primary: true })
    superset!: Superset;

    @Property({ default: 4 })
    sets!: number;

    @Property({ default: 8 })
    repetitions!: number;

    @OneToMany(() => Result, (result) => result.workoutSuperset)
    results = new Collection<Result>(this);

    constructor(workout: Workout, superset: Superset, sets: number, repetitions: number) {
        super();
        this.workout = workout;
        this.superset = superset;
        this.sets = sets;
        this.repetitions = repetitions;
    }
}
