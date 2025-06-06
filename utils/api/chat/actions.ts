"use server";

import { cookies } from "next/headers";
import { Chat, GroupedChats } from "types/chat";
import { config } from "config";

export async function loadChat(uuid: string): Promise<Chat | null> {
  try {
    const cookieStore = await cookies();

    const req = await fetch(`${config.apiUrl}/chat/${uuid}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const response = await req.json();

    if (!response.success) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function loadGroupedChats(): Promise<GroupedChats[] | null> {
  try {
    const cookieStore = await cookies();

    const req = await fetch(`${config.apiUrl}/chat/grouped`, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const response = await req.json();

    if (!response.success) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function searchChats(
  searchTerm: string
): Promise<{ chats: Chat[]; totalCount: number } | null> {
  try {
    const cookieStore = await cookies();

    const req = await fetch(
      `${config.apiUrl}/chat/search?searchTerm=${searchTerm}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );

    const response = await req.json();

    if (!response.success) {
      console.log(response);
      return null;
    }

    return { chats: response.data.chats, totalCount: response.data.totalCount };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateChatTitle(
  uuid: string,
  title: string
): Promise<boolean> {
  try {
    const cookieStore = await cookies();

    const req = await fetch(`${config.apiUrl}/chat/${uuid}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    const response = await req.json();

    return response.success;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteChat(uuid: string): Promise<boolean> {
  try {
    const cookieStore = await cookies();

    const req = await fetch(`${config.apiUrl}/chat/${uuid}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const response = await req.json();

    return response.success;
  } catch (error) {
    console.log(error);
    return false;
  }
}
