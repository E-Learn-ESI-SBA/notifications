// Plugin for Kafkajs

import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { Kafka, logLevel } from 'kafkajs';
import { consumerHandler } from '../handlers/consumer.js';

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
	const consumer = kafka.consumer({ groupId: options.groupId });
	await consumer.connect();

	await consumer.subscribe({ topic: options.topic });
	const consumerFn = consumerHandler(fastify);
	consumer.run({
		eachMessage: consumerFn,
	});
	fastify.decorate('kafka', kafka);
	fastify.decorate('consumer', consumer);
};

export default fp(kafkaPlugin);
