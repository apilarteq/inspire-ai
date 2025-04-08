export type Role = "user" | "assistant";

export interface Message {
  _id: string;
  content: string;
  createdAt: string;
  role: Role;
}
