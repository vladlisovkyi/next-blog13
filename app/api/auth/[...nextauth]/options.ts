import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import User from "@/models/User";
import { connectDb } from "@/lib/connectDb";
import clientPromise from "@/lib/mongoDb";


interface IUser {
  name: string;
  email: string;
  password: string;
}

export const options: NextAuthOptions = {
  pages: {
    signIn: "login",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        if (!credentials) return;
        await connectDb();
        const user: IUser = credentials as IUser;
        try {
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser || existingUser.password !== user.password) {
            throw new Error("Invalid credentials");
          }
          return existingUser;
        } catch (error) {
          console.error("Error registering user:", error);
          return null;
        }
      },
    }),
    // ...add more providers here
  ],
  // adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async session({ session, user, token }) {
      if (session.user) {
        const dbUser = await User.findOne({ email: session.user.email });
        session.user.username = dbUser.username;
        session.user.id = dbUser._id;
      }

      return session;
    },
  },
  session: { strategy: "jwt" },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
