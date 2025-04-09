"use client";
import React from "react";
import Chat from "components/chat";
import { useGlobal } from "context/global";

export default function App() {
  const { messages, setMessages } = useGlobal();

  React.useEffect(() => {
    setMessages([]);
  }, []);

  return <Chat messages={messages} />;
}
