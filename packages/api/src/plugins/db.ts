import type { Options } from "@mikro-orm/core";
import { MikroORM } from "@mikro-orm/core";
import type { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

import { entities } from "../entities";

const db: FastifyPluginAsync<Options> = async (fastify) => {
    const options: Options<PostgreSqlDriver> = {
        type: "postgresql",
        entities,
        host: fastify.config.DB_HOST,
        port: fastify.config.DB_PORT,
        user: fastify.config.DB_USER,
        password: fastify.config.DB_PASSWORD,
        dbName: fastify.config.DB_NAME,
        metadataProvider: TsMorphMetadataProvider,
    };

    const orm = await MikroORM.init(options);

    if (!orm) {
        throw new Error("cannot connect to database");
    }

    const schemaGenerator = orm.getSchemaGenerator();
    await schemaGenerator.ensureDatabase();
    // create a new migration
    // await orm.getMigrator().createMigration();
    await orm.getMigrator().up();

    fastify.decorate("orm", orm);

    fastify.addHook("onClose", () => orm.close());
};

// eslint-disable-next-line import/no-unused-modules
export default fp(db, {
    name: "db",
});
