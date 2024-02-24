import { Conversation } from "@/mongoDB/models/conversation.model";
import { Message } from "@/mongoDB/models/message.model";
import mongoose from "mongoose";

export const POST = async (req: Request, { params }: { params: { chatId: string } }) => {

    try {
        // Extract chatId from request params
        const { chatId } = params;

        // Extract sender and message from request body;
        const body = await req.json();
        const { sender, content } = body;

        // Validate request data
        if (!sender || !content) {
            return new Response(JSON.stringify(
                { message: "Invalid request!", data: null }),
                { status: 400 }
            );
        }

        // Find the conversation
        const conversation = await Conversation.findById(chatId);
        if (!conversation) {
            return new Response(JSON.stringify(
                { message: "Invalid request!", data: null }),
                { status: 400 }
            );
        }

        // Determine recipient based on conversation type and message data:
        let recipients = conversation.participants.filter((id: mongoose.Schema.Types.ObjectId) =>
            id.toString() !== sender.toString());

        console.log(recipients);


        // Create new Message Document
        const newMessage = await Message.create({
            conversation: conversation._id,
            sender,
            content,
        });
        if (!newMessage) {
            return new Response(JSON.stringify(
                { message: "Failed to create message!", data: newMessage }),
                { status: 500 }
            );
        }

        conversation.lastMessage = newMessage._id; 
        await conversation.save();

        console.log("Message created: ")
        return new Response(JSON.stringify(
            { message: "Message sent successfully!", data: newMessage }),
            { status: 200 }
        );

    } catch (error) {
        console.log("Error sending message: ",error);
        return new Response(JSON.stringify(
            { message: "Internal Server Error!", data: null }),
            { status: 500 }
        );
    }
}