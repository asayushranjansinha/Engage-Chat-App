import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
    }, members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ]
}, { timestamps: true });

export const Group = mongoose.models.Group || mongoose.model("Group", groupSchema);