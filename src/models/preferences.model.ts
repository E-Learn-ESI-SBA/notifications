import firebase from "firebase-admin"
export interface Event {
  id: string;
  groupId: string;
  topic: string;
  message: string;
  useEmail: boolean;
  usePush: boolean;
}

export interface Preferences extends  firebase.firestore.DocumentData{
  userId: string;
  enableEmail: boolean;
  enableNotification: boolean;
  group: string;
  year: string;
}
