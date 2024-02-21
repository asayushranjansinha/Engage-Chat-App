import { connectDB } from "@/mongoDB";
import { Chat } from "@/mongoDB/models/chat.model";
import { User } from "@/mongoDB/models/user.model";
import mongoose from "mongoose";

export const GET = async (req: Request, { params }: { params: { userId: string } }) => {
    try {
        // Connect to the database
        await connectDB();

        // Extract userId from params
        const { userId } = params;

        // Find the user and populate the 'chats' field
        const user = await User.findById(userId).populate({
            path: 'chats',
            options: { sort: { lastMessageAt: -1 } },
            populate: {
                path: 'members',
                match: { _id: { $ne: userId } }, // Exclude the current user
                select: 'username profileImage' // Select only required fields
            }
        });

        if (!user) {
            return new Response(JSON.stringify({ message: "User does not exist", data: null }), { status: 404 });
        }


        // Extract chat details from the populated 'chats' field
        const chats = user.chats.map((chat: any) => ({
            _id: chat._id,
            messages: chat.messages,
            isGroup: chat.isGroup,
            groupPhoto: chat.groupPhoto,
            lastMessageAt: chat.lastMessageAt,
            members: chat.members
        }));

        if (!chats) {
            return new Response(JSON.stringify({ message: "No chats found", data: null }), { status: 200 });
        }

        return new Response(JSON.stringify({ message: "Chats of user", data: chats }), { status: 200 });
    } catch (error) {
        console.error("Error fetching chats:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error", data: null }), { status: 500 });
    }
}