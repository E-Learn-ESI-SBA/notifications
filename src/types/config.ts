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
