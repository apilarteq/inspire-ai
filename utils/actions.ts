"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { Chat, GroupedChats } from "types/chat";
import { Message } from "types/message";
import { config } from "../config";

export async function loadChats(): Promise<Chat[] | null> {
  try {
    const cookieStore = await cookies();

    const req = await fetch(`${config.apiUrl}/chat`, {
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
    throw error;
  }
}

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
    throw error;
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
    throw error;
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

export async function apiRequest(prompt: string): Promise<Message> {
  try {
    const response = await fetch("http://localhost:3000/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();

    return data.response;
  } catch (error) {
    throw error;
  }
}

export async function verifySession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();

    const req = await fetch(`${config.apiUrl}/auth/verify`, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const response = await req.json();

    return response.success;
  } catch (error) {
    throw error;
  }
}

export const revalidate = async (route: string) => revalidatePath(route);
