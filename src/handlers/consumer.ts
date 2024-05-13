import { FastifyInstance } from "fastify";
import { EachMessageHandler } from "kafkajs";
import {EventPayload, EventValidator, PushTo} from "../types/validaor.js";
import {Preferences} from "../models/preferences.model.js";

export function consumerHandler(fastify: FastifyInstance): EachMessageHandler {
    return async ({message}) => {
        try {

            const eventMessage = message.value ? message.value.toString() : "";
            fastify.log.info(eventMessage);
            const payload = JSON.parse(eventMessage) as EventPayload;
            // Test Body
            try {

                EventValidator.parse(payload);
            } catch (e) {
                throw new Error("Invalid Message Payload");
            }
            if (payload.pushTo === PushTo.USER && payload.userId) {
                const user = await fastify.mongo.db?.collection<Preferences>("preferences").findOne({user: payload.userId});
                if (user && user.enableNotification) {
                    await fastify.firebase.messaging().sendToTopic(payload.userId, {
                        notification: {
                            body: payload.message,
                            title: payload.title,
                            badge: payload.badge ?? "",
                        },
                        data: {
                            body: payload.message,
                            title: payload.title,
                            badge: payload.badge ?? "",
                        },
                    });
                }
                return
            }
            const topic =
                payload.pushTo === PushTo.GROUP
                    ? payload.group
                    : payload.pushTo == PushTo.PROMO
                        ? payload.year
                        : PushTo.ALL;
            await fastify.firebase.messaging().send({
                topic: topic,
                webpush: {
                    notification: {
                        body: payload.message,
                        title: payload.title,
                        badge: payload.badge ?? "",
                    },
                    data: {
                        body: payload.message,
                        title: payload.title,
                        badge: payload.badge ?? "",
                    },
                }

            });
            return
        } catch (e) {
            fastify.log.error(e);


        }
    }
}





