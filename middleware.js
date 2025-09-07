import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ token }) {
      // Only allow if user is authenticated
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"], // protects everything except Next internals
};
