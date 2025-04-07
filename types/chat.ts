import { Message } from "./message";

export interface Chat {
  _id: string;
  title: string;
  createdAt: string;
  messages?: Message[];
}
