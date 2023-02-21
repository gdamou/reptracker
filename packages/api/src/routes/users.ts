import { FastifyInstance } from "fastify"

export async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/users/count', async () => {
        console.log(fastify.orm);
        
    })
}