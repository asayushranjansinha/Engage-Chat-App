import { connectDB } from "@/mongoDB";
import { Conversation } from "@/mongoDB/models/conversation.model";
import { Message } from "@/mongoDB/models/message.model";
import { User } from "@/mongoDB/models/user.model";

export const GET = async (req: Request, { params }: { params: { userId: string } }) => {
    try {
        // Connect to the database
        await connectDB();

        // Extract userId from params
        const { userId } = params;

        // Find all conversations where the user is a participant
        const conversations = await Conversation.find({ participants: { $in: [userId] } });

        // Collect all message IDs from those conversations
        const messageIds = conversations.map((conversation) => conversation._id);


        // // Find all messages with those IDs, including individual and group messages
        // const messages = await Message.find({
        //     _id: { $in: messageIds },
        //     $or: [{ senderId: userId }, { recipientId: { $in: [userId] } }],
        // });

        return new Response(JSON.stringify(
            { message: "Returning Conversations", data: conversations }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching chats:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error", data: null }), { status: 500 });
    }
}