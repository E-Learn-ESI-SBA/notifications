import {
	FastifyInstance,
	FastifyPluginAsync,
	FastifyPluginOptions,
} from 'fastify';

export const rootRoute: FastifyPluginAsync = async (
	fastify: FastifyInstance,
	opts: FastifyPluginOptions
): Promise<void> => {
	fastify.get('/', async function (request, reply) {
		return { root: true };
	});
};

export default rootRoute;
