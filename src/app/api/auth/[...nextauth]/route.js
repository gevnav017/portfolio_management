import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import db from "@/lib/prisma";

// Ensure first user exists (runs only if no users in db)
async function ensureFirstUser() {
  const userCount = await db.user.count();
  if (userCount === 0) {
    const hashedPassword = bcrypt.hashSync("password", 10);
    await db.user.create({
      data: {
        name: "Admin",
        email: "admin@example.com",
        password: hashedPassword,
      },
    });
    console.log("First admin user created");
  }
}
// Immediately invoke (but don't block exports)
ensureFirstUser();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return { id: user.id, name: user.name, email: user.email };
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  },
};

// App Router: export handlers for GET and POST
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
