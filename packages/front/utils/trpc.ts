import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@monorepo/api/src/routers/_app";

export const trpc = createTRPCReact<AppRouter>();
