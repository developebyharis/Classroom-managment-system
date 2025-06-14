import { getCredentials } from "@/helper/getCredentials";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const users = await getCredentials();
        // console.log("All users from DB:", users);
        // console.log("Login attempt:", credentials);
        const user = users.find(
          (u) =>
            u.username === credentials.username &&
            u.password === credentials.password
        );
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};