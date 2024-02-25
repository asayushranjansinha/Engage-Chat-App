import { connectDB } from "@/mongoDB";
import { Conversation } from "@/mongoDB/models/conversation.model";
import { ConversationType } from "@/types";
import mongoose from "mongoose";

export const GET = async (req: Request, { params }: { params: { userId: string } }) => {
  try {
    // Connect to the database
    await connectDB();

    // Extract userId from params
    const { userId } = params;

    // Find all conversations where the user is a participant
    const conversations = await Conversation.aggregate([
      {
        $match: {
          participants: { $in: [new mongoose.Types.ObjectId(userId)] }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "participants",
          foreignField: "_id",
          as: "participantsInfo"
        }
      },
      {
        $lookup: {
          from: "groups",
          localField: "_id",
          foreignField: "conversation",
          as: "groupInfo"
        }
      },
      {
        $unwind: "$groupInfo"
      },
      {
        $lookup: {
          from: "messages",
          localField: "lastMessage",
          foreignField: "_id",
          as: "lastMessage"
        }
      },
      {
        $unwind: { path: "$lastMessage", preserveNullAndEmptyArrays: true }
      },
      {
        $project: {
          _id: 1,
          type:1,
          lastMessageAt:1,
          participantsInfo: { $arrayElemAt: ["$participantsInfo", 1] },
          groupInfo: {
            name: "$groupInfo.name",
          },
          lastMessage: {
            content: "$lastMessage.content",
            sentOn: "$lastMessage.sentOn",
            seen: "$lastMessage.seen",
            delivered: "$lastMessage.delivered"
          }
        }
      }
    ]);
    
    
    

    console.log(conversations.length)
    if (!conversations) {
      return new Response(JSON.stringify(
        { message: "No conversations yet!", data: null }),
        { status: 200 }
      );
    }

    return new Response(JSON.stringify(
      { message: "Returning Conversations", data: conversations }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching chats:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error", data: null }), { status: 500 });
  }
}