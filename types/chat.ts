import { Message } from "./message";

export interface Chat {
  _id: string;
  title: string;
  createdAt: string;
  messages?: Message[];
}

export interface GroupedChats {
  date: string;
  chats: Chat[];
}

export interface SelectedChat {
  _id: string;
  title: string;
}
