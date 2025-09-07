"use server";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/db/db.mjs";

// API route to log out a user, destroy their session, and redirect
export async function POST(req) {
  const cookieStore = cookies(); // Access cookies using next/headers

  const sessionToken =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value;

  if (sessionToken) {
    // Remove the session from the database
    await db.session.deleteMany({
      where: { sessionToken: sessionToken },
    });

    // Construct the absolute URL using the BASE_URL from the .env file
    const signInUrl = `${process.env.BASE_URL}/auth/signin`;

    // Clear the session token cookies
    const response = NextResponse.redirect(signInUrl); // Redirect to sign-in page
    response.cookies.set("next-auth.session-token", "", { maxAge: 0 });
    response.cookies.set("__Secure-next-auth.session-token", "", { maxAge: 0 });

    return response;
  }

  return NextResponse.json({ message: "No session found" }, { status: 401 });
}
