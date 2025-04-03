import React from "react";
import SidebarClient from "./sidebar";
import { Chat } from "types/chat";

interface Props {
  chats: Chat[];
  isAuthenticated: boolean;
}

const SidebarServer = async ({ chats, isAuthenticated }: Props) => {
  return <SidebarClient chats={chats} isAuthenticated={isAuthenticated} />;
};

export default SidebarServer;
