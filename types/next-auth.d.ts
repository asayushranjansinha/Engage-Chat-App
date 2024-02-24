import { IUserDocument } from "@/mongoDB/models/user.model"
import mongoose from "mongoose"
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  
  interface Session {
    user: IUserDocument & DefaultSession["user"];
  }
}