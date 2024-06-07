import {
	FastifyInstance,
	FastifyPluginAsync,
	FastifyPluginOptions,
} from 'fastify';
import {
	EditPreferences,
	GetPreferences,
} from '../handlers/preferences.handler.js';
import { AuthMiddleware } from '../middlewares/auth.js';

const preferences: FastifyPluginAsync = async (
	fastify: FastifyInstance,
	opts: FastifyPluginOptions
): Promise<void> => {
	fastify.route({
		method: 'GET',
		url: '/',
		preHandler: AuthMiddleware(fastify),
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
		preHandler: AuthMiddleware(fastify),
		// schema: {
		// 	body: {
		// 		enableNotification: { type: 'boolean', required: true },
		// 		enableEmail: { type: 'boolean', required: true },
		// 	},
		// },
		handler: EditPreferences(fastify),
		errorHandler: function (error, request, reply) {
			request.log.error(error, 'a route error happened');
		},
	});
};

export default preferences;
/* 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXIiOiJodHRwczovL3d3dy5nb29nbGUuY29tIiwiZW1haWwiOiJtb2hhQGdtYWlsLmNvbSIsImV4cCI6MTcxNTU3Mjg3MywiZ3JvdXAiOiIxQSIsImlkIjoiMiIsInJvbGUiOiJhZG1pbiIsInVzZXJuYW1lIjoiYXlvdWIiLCJ5ZWFyIjoiMjAyMSJ9.c243Se8jfFDkoMuIvBmxDAIgbtkt0SCh2bV1bjHHOXQ

*/
