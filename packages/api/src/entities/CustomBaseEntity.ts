import { Index, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";

export abstract class CustomBaseEntity {
    [OptionalProps]?: "createdAt" | "updatedAt";

    @Index()
    @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
    id!: string;

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}
