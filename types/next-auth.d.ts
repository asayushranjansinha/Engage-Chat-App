import mongoose from "mongoose"
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    user: {
      _id: mongoose.Schema.Types.ObjectId,
      username: string | undefined,
      name: string | undefined,
      email: string | undefined,
      profileImage: string,
    } & DefaultSession["user"]
  }
}