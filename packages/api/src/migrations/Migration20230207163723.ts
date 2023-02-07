import { Migration } from '@mikro-orm/migrations';

export class Migration20230207163723 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "category" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, constraint "category_pkey" primary key ("id"));');
    this.addSql('create index "category_id_index" on "category" ("id");');

    this.addSql('create table "exercise" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, constraint "exercise_pkey" primary key ("id"));');
    this.addSql('create index "exercise_id_index" on "exercise" ("id");');

    this.addSql('create table "category_exercise" ("id" uuid not null default gen_random_uuid(), "exercise_id" uuid not null, "category_id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "category_exercise_pkey" primary key ("id", "exercise_id", "category_id"));');
    this.addSql('create index "category_exercise_id_index" on "category_exercise" ("id");');

    this.addSql('create table "superset" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, constraint "superset_pkey" primary key ("id"));');
    this.addSql('create index "superset_id_index" on "superset" ("id");');

    this.addSql('create table "exercise_superset" ("id" uuid not null default gen_random_uuid(), "exercise_id" uuid not null, "superset_id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "exercise_superset_pkey" primary key ("id", "exercise_id", "superset_id"));');
    this.addSql('create index "exercise_superset_id_index" on "exercise_superset" ("id");');

    this.addSql('create table "user" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" varchar(255) not null, "mail" varchar(255) not null, "password_hash" varchar(255) not null, constraint "user_pkey" primary key ("id"));');
    this.addSql('create index "user_id_index" on "user" ("id");');

    this.addSql('create table "workout" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "user_id" uuid not null, constraint "workout_pkey" primary key ("id"));');
    this.addSql('create index "workout_id_index" on "workout" ("id");');

    this.addSql('create table "workout_exercise" ("id" uuid not null default gen_random_uuid(), "workout_id" uuid not null, "exercise_id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "sets" int not null default 4, "repetitions" int not null default 8, constraint "workout_exercise_pkey" primary key ("id", "workout_id", "exercise_id"));');
    this.addSql('create index "workout_exercise_id_index" on "workout_exercise" ("id");');

    this.addSql('create table "workout_superset" ("id" uuid not null default gen_random_uuid(), "workout_id" uuid not null, "superset_id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "sets" int not null default 4, "repetitions" int not null default 8, constraint "workout_superset_pkey" primary key ("id", "workout_id", "superset_id"));');
    this.addSql('create index "workout_superset_id_index" on "workout_superset" ("id");');

    this.addSql('create table "result" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "sets" int not null, "repetitions" int not null, "workout_exercise_id" uuid null, "workout_exercise_workout_id" uuid null, "workout_exercise_exercise_id" uuid null, "workout_superset_id" uuid null, "workout_superset_workout_id" uuid null, "workout_superset_superset_id" uuid null, constraint "result_pkey" primary key ("id"));');
    this.addSql('create index "result_id_index" on "result" ("id");');

    this.addSql('alter table "category_exercise" add constraint "category_exercise_exercise_id_foreign" foreign key ("exercise_id") references "exercise" ("id") on update cascade;');
    this.addSql('alter table "category_exercise" add constraint "category_exercise_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade;');

    this.addSql('alter table "exercise_superset" add constraint "exercise_superset_exercise_id_foreign" foreign key ("exercise_id") references "exercise" ("id") on update cascade;');
    this.addSql('alter table "exercise_superset" add constraint "exercise_superset_superset_id_foreign" foreign key ("superset_id") references "superset" ("id") on update cascade;');

    this.addSql('alter table "workout" add constraint "workout_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "workout_exercise" add constraint "workout_exercise_workout_id_foreign" foreign key ("workout_id") references "workout" ("id") on update cascade;');
    this.addSql('alter table "workout_exercise" add constraint "workout_exercise_exercise_id_foreign" foreign key ("exercise_id") references "exercise" ("id") on update cascade;');

    this.addSql('alter table "workout_superset" add constraint "workout_superset_workout_id_foreign" foreign key ("workout_id") references "workout" ("id") on update cascade;');
    this.addSql('alter table "workout_superset" add constraint "workout_superset_superset_id_foreign" foreign key ("superset_id") references "superset" ("id") on update cascade;');

    this.addSql('alter table "result" add constraint "result_workout_exercise_id_workout_exercise_worko_50576_foreign" foreign key ("workout_exercise_id", "workout_exercise_workout_id", "workout_exercise_exercise_id") references "workout_exercise" ("id", "workout_id", "exercise_id") on update cascade on delete set null;');
    this.addSql('alter table "result" add constraint "result_workout_superset_id_workout_superset_worko_79485_foreign" foreign key ("workout_superset_id", "workout_superset_workout_id", "workout_superset_superset_id") references "workout_superset" ("id", "workout_id", "superset_id") on update cascade on delete set null;');
  }

}
