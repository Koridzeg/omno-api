import { FastifyInstance } from "fastify";

export default async function (fastify: FastifyInstance) {
  fastify.get("/hello", async (request, reply) => {
    return { message: "test" };
  });
}