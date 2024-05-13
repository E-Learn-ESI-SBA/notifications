import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyPluginOptions,
} from "fastify";

export const rootRoute: FastifyPluginAsync = async (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    return { root: true };
  });
  fastify.get("/push", async function (request, reply) {
    fastify.producer.send({
      topic: fastify.config.KAFKA_TOPIC,
      messages: [{ value: "Hello Again KafkaJS user!" }],
    });
    reply.send({ success: true });
  });
};

export default rootRoute;
