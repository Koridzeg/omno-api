import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import cors from "@fastify/cors";


export default fastifyPlugin(async function (fastify:FastifyInstance) {
    await fastify.register(cors, {
        origin: '*',
    })
    
    fastify.log.info('cors working')
})