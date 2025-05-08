import React from "react";
import { redirect } from "next/navigation";
import Chat from "components/chat";
import { loadChat } from "utils/api";

interface Props {
  params: Promise<{ uuid: string }>;
}

export default async function Home({ params }: Props) {
  const chat = await loadChat((await params).uuid);

  if (!chat) {
    redirect("/");
  }

  return <Chat messages={chat.messages || []} />;
}
