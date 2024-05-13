import * as path from "path";
import { AutoloadPluginOptions } from "@fastify/autoload";
import { FastifyPluginAsync } from "fastify";
import { fileURLToPath } from "url";
import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import { ConfigSchema } from "./types/config.js";
import FastifyMongo from "@fastify/mongodb";
import preferences from "./routes/prefrences.js";
import rootRoute from "./routes/root.js";
import firebasePlugin from "./plugins/firebase.js";
import { firebaseConfig } from "./config/firebase.js";
import kafkaPlugin from "./plugins/kafka.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export type AppOptions = {} & Partial<AutoloadPluginOptions>;

const options: AppOptions = {
  forceESM: true,
  routeParams: true,
};

const envPath = path.join(__dirname, "..", ".env");
const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts,
): Promise<void> => {
  // Add firebase

  void fastify
    .register(fastifyEnv, {
      confKey: "config",
      schema: ConfigSchema,
      dotenv: process.env.NODE_ENV && process.env.NODE_ENV == "development" ? {
        path: envPath,
        debug: true,
      }: undefined,
    })
    .after(() => {
      fastify.log.info(fastify.config);
      fastify.log.info(`the env file is ${envPath}`);
      fastify.log.info(fastify.config);

      void fastify.register(FastifyMongo, {
        url: fastify.config.MONGO_URI,
        database: "notifications",
        forceClose: true,
      });
    })
    .after(() => {
      void fastify
        .register(firebasePlugin, {
          credential: {
            ...firebaseConfig
          },
          projectId:firebaseConfig.projectId
        })
        .ready(() => {
          fastify.log.info("firebase initialized");
        });
    })
    .after(() => {
      fastify.register(kafkaPlugin, {
        broker: fastify.config.KAFKA_BROKER,
        groupId: fastify.config.KAFKA_GROUP_ID,
        topic: fastify.config.KAFKA_TOPIC,
        clientId: "notifications",
      });
    })
    .after(() => {
      fastify.register(rootRoute);
      fastify.register(preferences, {
        prefix: "/preferences",
      });
    });
};
const fastify = Fastify({
  logger: true,
});
// Env

app(fastify, {
  ...options,
});

export default app;
export { app, options };
