import { Index, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";

export abstract class CustomBaseEntity {
    [OptionalProps]?: "createdAt" | "updatedAt";

    @Index()
    @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
    id!: string;

    @Property({ defaultRaw: "now" })
    createdAt = new Date();

    @Property({ defaultRaw: "now", onUpdate: () => new Date() })
    updatedAt = new Date();
}
