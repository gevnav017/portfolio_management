"use server";

// route imports
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

// authenticate and verify user session server side
export const useServerSession = async () => {
  const session = await getServerSession();

  // If no session, construct a redirect response
  if (!session || !session.user) {
    const signInUrl = `${process.env.BASE_URL}/auth/signin`;

    const response = NextResponse.json(
      { redirectTo: signInUrl },
      { status: 401 } // Unauthorized
    );

    // Clear the session cookies
    response.cookies.set("next-auth.session-token", "", { maxAge: 0 });
    response.cookies.set("__Secure-next-auth.session-token", "", {
      maxAge: 0,
    });

    return response; // Return the redirect response
  }

  // Return the user if authenticated
  return session.user;
};
