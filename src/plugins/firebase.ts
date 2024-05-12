// Create Firebase Plugin

import firebase from 'firebase-admin';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

// Add the firebase conf as options
export interface FirebaseOptions {
	credential: firebase.ServiceAccount;
}
const firebasePlugin: FastifyPluginAsync<FirebaseOptions> = async (
	fastify,
	options
) => {
	// Initialize Firebase
	firebase.initializeApp({
		credential: firebase.credential.cert(options.credential),
	});
	fastify.decorate('firebase', firebase);
};

export default fp(firebasePlugin);
