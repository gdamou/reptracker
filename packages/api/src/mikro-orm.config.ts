import { Options } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { Category } from "./entities/Category";
import { CategoryExercise } from "./entities/CategoryExercise";
import { Exercise } from "./entities/Exercise";
import { ExerciseSuperset } from "./entities/ExerciseSuperset";
import { Result } from "./entities/Result";
import { Superset } from "./entities/Superset";
import { User } from "./entities/User";
import { Workout } from "./entities/Workout";
import { WorkoutExercise } from "./entities/WorkoutExercise";
import { WorkoutSuperset } from "./entities/WorkoutSuperset";

const config: Options<PostgreSqlDriver> = {
    type: "postgresql",
    host: "localhost",
    port: 5432,
    user: "postgresql",
    password: "docker",
    dbName: "rep-tracker",
    entities: [Category, CategoryExercise, Exercise, ExerciseSuperset, Result, Superset, User, Workout, WorkoutExercise, WorkoutSuperset],
    metadataProvider: TsMorphMetadataProvider,
};

export default config;
