import { JWTPayload } from 'jose';
import { z } from 'zod';

// Env Var Schema
export const ConfigSchema = {
	type: 'object',
	required: ['JWT_SECRET', 'MONGO_URI'],
	properties: {
		JWT_SECRET: {
			type: 'string',
			default: 'aTZ6czFOcTFHekRrZEJHUTB5cFlZZ0M1aXQyR3FiNlltaWx5aDJFUWpIQT0K',
		},
		NODE_ENV: {
			type: 'string',
			default: 'development',
		},
		MONGO_URI: {
			type: 'string',
			default: 'mongodb://localhost:27017',
		},
		KAFKA_GROUP_ID: {
			type: 'string',
		},
		KAFKA_BROKER: {
			type: 'string',
		},
		KAFKA_TOPIC: {
			type: 'string',
			default: 'notifications',
		},
	},
};

export interface UserClaims extends JWTPayload {
	/*
	 "avatar": "https://www.google.com",
  "email": "ameri.mohamedayoub@gmail.com",
  "exp": 1715572535,
  "id": "12",
  "role": "admin",
  "username": "ayoub"
}
	*/
	avatar: string;
	email: string;
	exp: number;
	id: string;
	role: string;
	username: string;
	group: string;
	year: string;
}

export const UserClaimValidator = z.object({
	avatar: z.string(),
	email: z.string(),
	exp: z.number(),
	id: z.string(),
	role: z.string(),
	username: z.string(),
	group: z.string(),
	year: z.string(),
});
