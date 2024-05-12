import  { FastifyInstance } from 'fastify';
import { Preferences } from '../models/preferences.model.js';
import {EventPayload} from "../types/validaor.js";

export function consumerHandler(fastify: FastifyInstance): Function {
	return async (msg: EventPayload, commit: () => void) => {
		console.log("message : ",msg)
		const user = await fastify.mongo.db
			?.collection<Preferences>('preferences')
			.findOne({
				_id: fastify.mongo.ObjectId.createFromHexString(msg.id),
			});
		if (!user) {
			throw new Error('User not found');

		}
		if (user.useEmail) {
			// Send Email
		}
		if (user.usePush) {
			// Send Push Notification
		}
		commit();
	};
}
