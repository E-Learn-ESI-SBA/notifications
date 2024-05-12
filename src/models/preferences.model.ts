export interface Event {
	id: string;
	groupId: string;
	topic: string;
	message: string;
	useEmail: boolean;
	usePush: boolean;
}

export interface Preferences extends Document{
	userId: string;
	useEmail: boolean;
	usePush: boolean;
	// Other Preferences settings for user
}
