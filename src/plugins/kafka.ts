// Plugin for Kafkajs

import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { Kafka, logLevel } from "kafkajs";
import {consumerHandler} from "../handlers/consumer.js";
import {EventPayload, PushTo} from "../types/validaor.js";

// add options also
export interface KafkaOptions {
  broker: string;
  groupId: string;
  topic: string;
  clientId: string;
}
const kafkaPlugin: FastifyPluginAsync<KafkaOptions> = async (
  fastify,
  options,
) => {
  const kafka = new Kafka({
    clientId: options.clientId,
    brokers: [options.broker],
    logLevel: logLevel.ERROR,
  });
  const producer = kafka.producer();
  const consumer = kafka.consumer({ groupId: options.groupId });
  await Promise.all([producer.connect(), consumer.connect()]);
  const message:EventPayload = {
    message: "Hello KafkaJS",
    year: "2021",
    userId: "123",
    pushTo: PushTo.PROMO,
    group: "123",
    title: "Hello",
    role: "Admin",
    enablePush: true,
    enableEmail: true,
   // badge: "1",
  }
  const strMessage = JSON.stringify(message);
  await producer.send({
    topic: options.topic,
    messages: [{ value: strMessage }],
    acks: 1,
  });
  await consumer.subscribe({ topic: options.topic });
  const consumerFn = consumerHandler(fastify);
  consumer.run({
    eachMessage: consumerFn,
  });
  fastify.decorate("kafka", kafka);
  fastify.decorate("consumer", consumer);
  fastify.decorate("producer", producer);
};

export default fp(kafkaPlugin);
