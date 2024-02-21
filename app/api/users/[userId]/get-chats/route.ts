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

        // Check if user exists
        const userExists = await User.exists({ _id: userId });
        if (!userExists) {
            return new Response(JSON.stringify({ message: "User does not exist", data: null }), { status: 404 });
        }


        // Find all chats where the user is a member and aggregate members
        const chats = await Chat.aggregate([
            {
                $match: { members: new mongoose.Types.ObjectId(userId) }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "members",
                    foreignField: "_id",
                    as: "members"
                }
            },
            {
                $project: {
                    "members": {
                        $filter: {
                            input: "$members",
                            as: "member",
                            cond: { $ne: ["$$member._id", new mongoose.Types.ObjectId(userId)] }
                        }
                    },
                    messages: 1,
                    isGroup: 1,
                    groupPhoto: 1,
                    lastMessageAt: 1,
                    _id:1,
                }
            },
            {
                $sort: { lastMessageAt: -1 }
            }
        ]);

        if (!chats) {
            return new Response(JSON.stringify({ message: "No chats found", data: null }), { status: 200 });
        }

        return new Response(JSON.stringify({ message: "Chats of user", data: chats }), { status: 200 });
    } catch (error) {
        console.error("Error fetching chats:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error", data: null }), { status: 500 });
    }
}