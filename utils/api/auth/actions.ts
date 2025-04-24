"use server";
import { cookies } from "next/headers";
import { config } from "config";

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
