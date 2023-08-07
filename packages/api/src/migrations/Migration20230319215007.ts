import { Migration } from '@mikro-orm/migrations';

export class Migration20230319215007 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "exercise_supersets" ("exercise_id" uuid not null, "superset_id" uuid not null, constraint "exercise_supersets_pkey" primary key ("exercise_id", "superset_id"));');

    this.addSql('alter table "exercise_supersets" add constraint "exercise_supersets_exercise_id_foreign" foreign key ("exercise_id") references "exercise" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "exercise_supersets" add constraint "exercise_supersets_superset_id_foreign" foreign key ("superset_id") references "superset" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "exercise_superset" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "exercise_superset" ("id" uuid not null default gen_random_uuid(), "exercise_id" uuid not null, "superset_id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "exercise_superset_pkey" primary key ("id", "exercise_id", "superset_id"));');
    this.addSql('create index "exercise_superset_id_index" on "exercise_superset" ("id");');

    this.addSql('alter table "exercise_superset" add constraint "exercise_superset_exercise_id_foreign" foreign key ("exercise_id") references "exercise" ("id") on update cascade;');
    this.addSql('alter table "exercise_superset" add constraint "exercise_superset_superset_id_foreign" foreign key ("superset_id") references "superset" ("id") on update cascade;');

    this.addSql('drop table if exists "exercise_supersets" cascade;');
  }

}
