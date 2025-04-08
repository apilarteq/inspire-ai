import React from "react";
import Chat from "components/chat";
import { loadChat } from "utils/actions";

interface Props {
  params: Promise<{ uuid: string }>;
}

export default async function Home({ params }: Props) {
  const chat = await loadChat((await params).uuid);

  return <Chat messages={chat?.messages || []} />;
}
