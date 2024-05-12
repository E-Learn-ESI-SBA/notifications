import {
	FastifyInstance,
	FastifyPluginAsync,
	FastifyPluginOptions,
} from 'fastify';
import {
	EditPreferences,
	GetPreferences,
} from '../handlers/preferences.handler.js';
import fastifyBearerAuth from '@fastify/bearer-auth';

const preferences: FastifyPluginAsync = async (
	fastify: FastifyInstance,
	opts: FastifyPluginOptions
): Promise<void> => {
	const jwtKeys = new Set([
		'aTZ6czFOcTFHekRrZEJHUTB5cFlZZ0M1aXQyR3FiNlltaWx5aDJFUWpIQT0K',
	]);
	void fastify.register(fastifyBearerAuth, { keys: jwtKeys });

	fastify.route({
		method: 'GET',
		url: '/',
		schema: {
			response: {
				200: {
					type: 'object',
					properties: {
						useEmail: { type: 'boolean' },
						usePush: { type: 'boolean' },
					},
				},
			},
		},
		handler: GetPreferences(fastify),
		errorHandler: function (error, request, reply) {
			request.log.error(error, 'a route error happened');
		},
	});
	fastify.route({
		method: 'POST',
		url: '/',
		schema: {
			body: {
				useEmail: { type: 'boolean' },
				usePush: { type: 'boolean' },
			},
		},
		handler: EditPreferences(fastify),
		errorHandler: function (error, request, reply) {
			request.log.error(error, 'a route error happened');
		},
	});
};

export default preferences;
