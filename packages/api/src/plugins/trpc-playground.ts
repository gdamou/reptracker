import fp from "fastify-plugin";
import { getFastifyPlugin } from "trpc-playground/handlers/fastify";

import { appRouter } from "../router/routers/_app";

// eslint-disable-next-line import/no-unused-modules
export default fp(async function (server) {
    const playgroundPlugin = await getFastifyPlugin({
        trpcApiEndpoint: "/trpc",
        playgroundEndpoint: "/playground",
        router: appRouter,
        request: {
            superjson: true,
        },
    });
    await server.register(playgroundPlugin, { prefix: "/playground" });
});
