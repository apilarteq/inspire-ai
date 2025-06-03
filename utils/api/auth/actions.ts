"use server";
import { cookies } from "next/headers";
import { config } from "config";

export async function verifySession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    console.log("Cookie", cookieStore.toString());

    const req = await fetch(`${config.apiUrl}/auth/verify`, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const response = await req.json();
    console.log("verify response", response);

    return response.success;
  } catch (error) {
    console.log(error);
    return false;
  }
}
