import { Migration } from '@mikro-orm/migrations';

export class Migration20230323173732 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "workout_supersets" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "workout_supersets" ("workout_id" uuid not null, "superset_id" uuid not null, constraint "workout_supersets_pkey" primary key ("workout_id", "superset_id"));');

    this.addSql('alter table "workout_supersets" add constraint "workout_supersets_workout_id_foreign" foreign key ("workout_id") references "workout" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "workout_supersets" add constraint "workout_supersets_superset_id_foreign" foreign key ("superset_id") references "superset" ("id") on update cascade on delete cascade;');
  }

}
