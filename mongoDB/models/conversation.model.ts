import { ConversationType } from "@/types";
import mongoose from "mongoose";

// Interface for Conversation documents
export interface IConversationDocument extends Document {
    type: ConversationType;
    participants: mongoose.Schema.Types.ObjectId[];
    lastMessage?: mongoose.Schema.Types.ObjectId;
    createdOn: Date;
}

// Conversation schema
const conversationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, "Conversation type is required!"],
        enum: ConversationType,
    },
    participants: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
            }
        ],
        // Creating a compound index to ensure uniqueness of participants combination
        index: { unique: true }
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
});

// Create or retrieve the Mongoose model for Conversation
export const Conversation =
    mongoose.models.Conversation || mongoose.model<IConversationDocument>('Conversation', conversationSchema);
