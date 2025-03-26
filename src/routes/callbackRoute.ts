import { FastifyInstance } from "fastify";

export default async function (fastify: FastifyInstance) {
  fastify.get(
    "/callback",
    {
      schema: {
        tags: ["Payment"],
        description: "Callback endpoint to confirm successful payment",
        response: {
          200: {
            type: "object",
            properties: {
              message: { type: "string", example: "Payment was successful" },
            },
          },
          500: {
            type: "object",
            properties: {
              error: { type: "string", example: "Internal Server Error" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        return reply.send({ message: "Payment was successful" });
      } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    }
  );

  fastify.get(
    "/callbackFail",
    {
      schema: {
        tags: ["Payment"],
        description: "Callback endpoint to confirm failed payment",
        response: {
          200: {
            type: "object",
            properties: {
              message: { type: "string", example: "Payment was unsuccessful" },
            },
          },
          500: {
            type: "object",
            properties: {
              error: { type: "string", example: "Internal Server Error" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        return reply.send({ message: "Payment was unsuccessful" });
      } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    }
  );
}

