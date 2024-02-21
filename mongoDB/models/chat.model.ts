import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    members: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: []
    },
    messages: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
        default: [],
    },
    isGroup: {
        type: Boolean,
        default: false,
    },
    groupPhoto: {
        type: String,
        default: "",
    },
    lastMessageAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

export const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);