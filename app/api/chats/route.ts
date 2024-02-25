import { Conversation } from "@/mongoDB/models/conversation.model";
import { Group } from "@/mongoDB/models/group.model";
import { User } from "@/mongoDB/models/user.model";
import { ConversationType } from "@/types";

export const POST = async (req: Request) => {
    try {
        const body = await req.json()
        const { recipients, type, groupName, groupDescription } = body;

        // Validate request data
        if (!recipients || !type) {
            return new Response(JSON.stringify(
                { message: "Missing required fields!", data: null }),
                { status: 400 }
            );
        }

        // Check valid conversation type
        if (type !== 'individual' && type !== 'group') {
            return new Response(JSON.stringify(
                { message: "Invalid conversation type!", data: null }),
                { status: 400 }
            );
        }

        // Validate participants based on conversation type
        if (type === 'individual' && recipients.length !== 2) {
            return new Response(JSON.stringify(
                { message: "Individual chats require 2 participants!", data: null }),
                { status: 400 }
            );
        }

        // Check if all recipients exist
        const recipientsExist = await User.find({ _id: { $in: recipients } }).countDocuments();
        if (recipientsExist !== recipients.length) {
            return new Response(JSON.stringify({ message: "One or more recipients not found", data: null }), { status: 404 });

        }

        const existingConversation = await Conversation.findOne({
            participants: recipients,
        });

        if (existingConversation) {
            return new Response(JSON.stringify(
                { message: "Conversation already exists!", data: existingConversation?._id }),
                { status: 200 }
            );
        }

        // Create a new group if the conversation type is "group"
        if (type === ConversationType.GROUP) {
            // Create new group document
            const newGroup = await Group.create({
                name: groupName,
                description: groupDescription,
                members: recipients,
            });

            // Create new conversation document
            const newConversation = await Conversation.create({
                type,
                participants: recipients,
                group: newGroup._id,
            });

            // Link group with conversation
            newGroup.conversation = newConversation._id;
            await newGroup.save();

            // Send created chat as response
            return new Response(JSON.stringify(
                { message: "Started conversation successfully", data: newConversation._id }),
                { status: 201 }
            );
        }

        // Create new conversation document for individual chats
        const newConversation = await Conversation.create({
            type,
            participants: recipients,
            createdOn: Date.now(),
        });

        // Send created chat as response
        return new Response(JSON.stringify(
            { message: "Started conversation successfully", data: newConversation?._id }),
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating chat:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error", chat: null }), { status: 201 })
    }
}