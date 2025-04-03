export type Role = "user" | "assistant";

export interface Message {
  uuid: string;
  content: string;
  createdAt: string;
  role: Role;
}
