export type Role = "user" | "model";

export interface Message {
  _id: string;
  content: string;
  createdAt: string;
  role: Role;
}

export interface MessageWithChatUuid extends Message {
  chatUuid: string;
}
