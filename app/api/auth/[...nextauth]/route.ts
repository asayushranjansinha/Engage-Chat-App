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
                    const isPasswordMatch = await user.isPasswordCorrect(credentials.password);
                    // If password is incorrect, throw error
                    if (!isPasswordMatch) {
                        throw new Error("Invalid Username or Password");
                    }

                    user.lastActive = Date.now();
                    await user.save();
                    
                    // Return user if authentication succeeds
                    return user;
                } catch (error: any) {
                    // Log and throw error
                    console.error("Authentication error:", error);
                    throw new Error(error);
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ $or: [{ email: session?.user?.email }, { username: session?.user?.username }] }).select("-password");
            session.user = { ...session.user, ...sessionUser._doc };
            return session;
        },
        async signIn({ account, profile }) {
            if (account?.provider !== "google") {
                throw new Error("Unsupported provider. Currently only supports Google.");
            }

            try {
                // Connect to database
                await connectDB();
                // Check for existing user using email 
                const user = await User.findOne({ email: profile?.email }).select("-password");

                // console.log(profile)
                // if user exists update necessary details (e.g., name, picture)
                if (user) {

                    user.name = profile?.name;
                    user.profileImageUrl = (profile as any)?.picture ? (profile as any)?.picture : "";
                    user.lastActive = Date.now();
                    await user.save();

                    // console.log("Updated user:", user);
                    return user;

                }


                // Create new user with details
                const newUser = await User.create({
                    username: (profile as any)?.given_name.toLowerCase(),
                    email: profile?.email,
                    password: "defaultpassword",
                    profileImageUrl: (profile as any)?.picture ? (profile as any)?.picture : "",
                });

                return newUser;
            } catch (error) {
                console.error("Error signing in: via google", error);
                throw error;
            }
        },
    }
});

export { handler as GET, handler as POST };

