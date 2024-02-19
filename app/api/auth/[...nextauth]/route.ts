import { connectDB } from "@/mongoDB";
import { User } from "@/mongoDB/models/user.model";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // console.log("enters authorize")
                try {
                    // Validate credentials
                    if (!credentials?.username || !credentials?.password) {
                        throw new Error("Please enter your username and password");
                    }

                    // Connect to the database
                    await connectDB();

                    // Find the user by username
                    const user = await User.findOne({ username: credentials.username });
                    // If user not found, throw error
                    if (!user) {
                        // console.log("usernotfound")
                        throw new Error("Invalid Username");
                    }

                    // Check if the password is correct
                    const isPasswordMatch = user.isPasswordCorrect(credentials.password);

                    // If password is incorrect, throw error
                    if (!isPasswordMatch) {
                        throw new Error("Invalid Username or Password");
                    }

                    // Return user if authentication succeeds
                    return user;
                } catch (error) {
                    // Log and throw error
                    console.error("Authentication error:", error);
                    throw new Error("Failed to authenticate");
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ $or: [{ email: session?.user?.email }, { username: session?.user?.username }] }).select("-password");
            session.user.id = sessionUser._id.toString();
            session.user = { ...session.user, ...sessionUser._doc };
            return session;
        },
        async signIn({ account, profile }) {
            if (account?.provider === "google") {
                try {
                    await connectDB();

                    /* Check is the user exist */
                    let user = await User.findOne({ email: profile?.email });
                    const userInfo = {
                        username: profile?.name,
                        email: profile?.email,
                        password: "defaultpassword",
                        profileImage: (profile as any)?.picture ? (profile as any)?.picture : ""
                    };

                    if (!user) {
                        user = await User.create(userInfo);
                    }
                    const createdUser = await User.findById(user._id).select("-password");
                    return createdUser;
                } catch (err: any) {
                    console.log("Error checking if user exists: ", err?.message);
                }
            }

            return true
        },
    }
});

export { handler as GET, handler as POST };

