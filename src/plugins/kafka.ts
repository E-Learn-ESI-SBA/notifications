// Plugin for Kafkajs

import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { Kafka, logLevel } from 'kafkajs';

// add options also
export interface KafkaOptions {
	broker: string;
	groupId: string;
	topic: string;
	clientId: string;
}
const kafkaPlugin: FastifyPluginAsync<KafkaOptions> = async (
	fastify,
	options
) => {
	const kafka = new Kafka({
		clientId: options.clientId,
		brokers: [options.broker],
		logLevel: logLevel.ERROR,
	});
	const producer = kafka.producer();
	const consumer = kafka.consumer({ groupId: options.groupId });
	await Promise.all([producer.connect(), consumer.connect()]);
	await producer.send({
		topic: fastify.config.KAFKA_TOPIC,
		messages: [{ value: 'Hello KafkaJS user!' }],
		acks: 1,
	});
	await consumer.subscribe({ topic: options.topic });
	consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			fastify.log.info({
				value: `Consumer ${message?.value?.toString()}`,
			});
		},
	});
	fastify.decorate('kafka', kafka);
	fastify.decorate('consumer', consumer);
	fastify.decorate('producer', producer);
};

export default fp(kafkaPlugin);
