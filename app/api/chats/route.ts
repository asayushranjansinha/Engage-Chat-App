import { Chat } from "@/mongoDB/models/chat.model";
import { User } from "@/mongoDB/models/user.model";

export const POST = async (req: Request) => {
    try {
        const body = await req.json()
        const { sender, recipients, isGroup } = body;

        // Check if sender exists
        const userExists = await User.exists({ _id: sender });
        if (!userExists) {
            return new Response(JSON.stringify({ message: "Sender not found", data: null }), { status: 404 });
        }

        // Check if all recipients exist
        const recipientsExist = await User.find({ _id: { $in: recipients } }).countDocuments();
        if (recipientsExist !== recipients.length) {
            return new Response(JSON.stringify({ message: "One or more recipients not found", data: null }), { status: 404 });

        }

        // Create a new chat
        const newChat = new Chat({
            members: [sender, ...recipients],
            messages: [],
            isGroup,
        });

        // Save the chat to the database
        await newChat.save();

        // Update sender and recipients' chats arrays to include the new chat ID
        await User.updateMany(
            { _id: { $in: [sender, ...recipients] } },
            { $push: { chats: newChat._id } }
        );

        // Send created chat as response
        return new Response(JSON.stringify({ message: "Chat created successfully", data: newChat?._id }), { status: 201 })

    } catch (error) {
        console.error("Error creating chat:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error", chat: null }), { status: 201 })
    }
}