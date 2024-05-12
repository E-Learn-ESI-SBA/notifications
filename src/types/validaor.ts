import { z } from 'zod';
export const EventValidator = z.object({
	message: z.string(),
	useEmail: z.boolean().default(false),
	usePush: z.boolean().default(true),
	topic: z.string(),
	id: z.string(),
	role: z.string(),
	group: z.string(),
});

export type EventPayload = z.infer<typeof EventValidator>;
