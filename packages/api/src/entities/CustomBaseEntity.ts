import { Index, PrimaryKey, Property } from "@mikro-orm/core";

export abstract class CustomBaseEntity {
    @Index()
    @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
    id!: string;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();
}
