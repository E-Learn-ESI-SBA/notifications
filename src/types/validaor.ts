import { z } from "zod";
export enum PushTo {
  GROUP = "group",
  USER = "user",
  PROMO = "promo",
  ALL = "all",
}
export const EventValidator = z.object({
  message: z.string(),
  enableEmail: z.boolean().default(false),
  enablePush: z.boolean().default(true),
  title: z.string(),
  badge: z.string().optional().nullable(),
  userId: z.string().optional().nullable(),
  role: z.string(),
  group: z.string(),
  pushTo: z.nativeEnum(PushTo),
  year: z.string(),
});

export type EventPayload = z.infer<typeof EventValidator>;
