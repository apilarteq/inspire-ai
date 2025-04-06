"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { Chat } from "types/chat";
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

export async function loadMessages(): Promise<Message[] | null> {
  try {
    // await fetch("https://dummyjson.com/users").then((res) => res.json());

    const messages: Message[] = [
      {
        uuid: "1",
        content:
          "Recomendame una buena película de patinadores sobre hielo donde sale chas michael michales",
        role: "user",
        createdAt: "2022-01-17 17:25:04.019",
      },
      {
        uuid: "2",
        content: `¡Claro! La película que describes es **"Ligas Mayores sobre Hielo" (Blades of Glory)**, estrenada en 2007.

*   **Personajes principales:**
    *   Chazz Michael Michaels (interpretado por Will Ferrell)
    *   Jimmy MacElroy (interpretado por Jon Heder)

*   **Trama:** La película es una comedia sobre dos patinadores artísticos rivales que, después de pelearse en el podio de una competencia, son descalificados y se les prohíbe competir en patinaje individual. Sin embargo, descubren una laguna en las reglas que les permite competir en patinaje artístico en pareja, aunque inicialmente se odian.

*   **Otros detalles:**
    *   Chazz Michael Michaels tiene problemas con el alcohol y asiste a Alcohólicos Anónimos.
    *   La película está llena de humor absurdo y escenas exageradas de patinaje.
    *   También aparecen Amy Poehler y Will Arnett como otra pareja de patinadores rivales.`,
        role: "assistant",
        createdAt: "2022-01-17 17:25:04.019",
      },
      {
        uuid: "3",
        content: "Sistemas de información",
        role: "user",
        createdAt: "2022-01-17 17:25:04.019",
      },
      {
        uuid: "4",
        content: `A [Nextjs](https://nextjs.org) app demonstrating how to display rich-text responses from Large Language Models (LLMs) by prompting and rendering Markdown formatting, Mermaid diagrams, and LaTeX equations.

Read more in this blog post: [Rendering rich responses from LLMs](https://www.skovy.dev/blog/vercel-ai-rendering-markdown)

## Examples

This example is asking for the top grossing movies, structured as a Mermaid pie chart.

![LLM Markdown Demo](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2plcW5jdzdmczkxMWI5YW9kcm9qYjh5ODdyOGRyZzhiYjhpOHB6MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RlwF2vFb4y7bDnWvcO/giphy.gif)

This example is asking when vegetables should be planted, structured as a Mermaid Gantt chart.

![LLM Markdown Demo](https://www.easygifanimator.net/images/samples/video-to-gif-sample.gif)

## Technologies

- [Nextjs](https://nextjs.org)
- [Vercel AI](https://sdk.vercel.ai/docs)
- And more...

## Setup

- Clone the project
- Open in your browser
- Set your OpenAI API Key`,
        role: "assistant",
        createdAt: "2022-01-17 17:25:04.019",
      },
    ];

    return messages;
  } catch (error) {
    throw error;
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
