import { prismaClient } from "@/lib/prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: { label: "아이디", type: "text" },
      },
      async authorize(credentials) {
        // 여기에 인증 로직 구현
        if (!credentials) {
          throw new Error("인증 정보가 잘못되었습니다.");
        }

        console.log(credentials);
        const findUser = await prismaClient.user.findFirst({
          where: {
            id: credentials.id,
          },
        });
        console.log(findUser);

        if (!findUser) return null;

        return { id: findUser.id, name: findUser.name };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async session({ session, token }) {
      session.token = token;
      return session;
    },
    async jwt({ token, user, trigger, account, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      console.log(token);
      return token;
    },
  },
  session: {
    maxAge: 60 * 60 * 24 * 365, // 1 year
  },
});

export { handler as GET, handler as POST };
