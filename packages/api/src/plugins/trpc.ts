import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fp from "fastify-plugin";

import { createContext } from "../router/context";
import { appRouter } from "../router/routers/_app";

// eslint-disable-next-line import/no-unused-modules
export default fp(async function (server) {
    await server.register(fastifyTRPCPlugin, {
        prefix: "/trpc",
        trpcOptions: { router: appRouter, createContext },
    });
});
