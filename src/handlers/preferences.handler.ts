import {FastifyInstance, RouteHandler} from 'fastify';

export const EditPreferences = (fastify: FastifyInstance): RouteHandler => {
	return function (request, reply) {
		const { useEmail, usePush } = request.body as {
			useEmail: boolean;
			usePush: boolean;
		};
		//@ts-ignore
		const userId = request.user.id;
		fastify.mongo.db?.collection('preferences').updateOne(
			{ userId },
			{ $set: { useEmail, usePush } },
			{
				upsert: true,
			}
		);

		return reply.send({ success: true });
	};
};

export const GetPreferences = (fastify: FastifyInstance): RouteHandler => {
	return function (request, replay) {
		const preferences = fastify.mongo.db?.collection('preferences').findOne({
			//@ts-ignore
			userId: request.user.id,
		});
		return replay.send({ preferences });
	};
};
