import Fastify from "fastify";
import autoload from "@fastify/autoload";
import { join } from "path";

const fastify = Fastify({ logger: true });

fastify.register(require('@fastify/swagger'), {
  swagger: {
    info: { title: 'Omno API Integration', version: '1.0.0' },
    tags: [
      { name: 'Transaction', description: 'Transaction  endpoints' },
      { name: 'Webhook', description: 'Webhook  endpoints' }
    ],
  },
});

fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/docs',
  exposeRoute: true,
});

fastify.register(autoload, {
  dir: join(__dirname, "plugins"),
});

fastify.register(autoload, {
  dir: join(__dirname, "routes"),
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    console.log("🚀 Server running at http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
