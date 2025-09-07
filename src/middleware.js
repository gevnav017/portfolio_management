import { withAuth } from "next-auth/middleware";

// This runs on every matched request. Return true only if logged in.
// Always allow the login and NextAuth endpoints so cookies can be set/cleared.
export default withAuth({
  pages: { signIn: "/auth/signin" },
  callbacks: {
    authorized: ({ token, req }) => {
      const p = req.nextUrl.pathname;
      if (p.startsWith("/auth/signin") || p.startsWith("/api/auth"))
        return true;
      return !!token; // block when no token
    },
  },
});

// Protect everything except Next internals + login + NextAuth
export const config = {
  matcher: ["/((?!_next|favicon.ico|login|api/auth).*)"],
};
