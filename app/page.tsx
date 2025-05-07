"use client";
import React from "react";
import Chat from "components/chat";
import { useGlobal } from "context/global";
import { usePathname } from "next/navigation";

export default function Page() {
  const { messages, setMessages } = useGlobal();
  const pathname = usePathname();

  React.useEffect(() => {
    if (pathname === "/") setMessages([]);
  }, [pathname]);

  return <Chat messages={messages} />;
}
