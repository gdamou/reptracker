import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

export function createContext({ req, res }: CreateFastifyContextOptions) {
    const user = { name: req.headers.username ?? "anonymous" };
    const orm = req.server.orm.em.fork();
    return { req, res, user, orm };
}

export type Context = inferAsyncReturnType<typeof createContext>;
