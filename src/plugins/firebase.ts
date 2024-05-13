// Create Firebase Plugin

import admin from "firebase-admin";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import {ServiceAccount} from "firebase-admin";

// Add the firebase conf as options
export interface FirebaseOptions {
  credential:  ServiceAccount;
  projectId : string
}
const firebasePlugin: FastifyPluginAsync<FirebaseOptions> = async (
  fastify,
  options,
) => {

  const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(options.credential),
    projectId: options.projectId,
    serviceAccountId: options.credential.clientEmail
  })


  fastify.decorate("firebase", firebaseApp);
};

export default fp(firebasePlugin);
