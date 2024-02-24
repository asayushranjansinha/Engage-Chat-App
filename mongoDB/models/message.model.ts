import mongoose, { Document } from "mongoose";

export interface IMessageDocument extends Document {
  conversation: mongoose.Schema.Types.ObjectId;
  sender: mongoose.Schema.Types.ObjectId;
  content: string;
  delivered: boolean;
  seen: boolean;
  sentOn: Date;
}

const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: [true, "Message is blank"],
    },
    delivered: {
      type: Boolean,
      default: false,
    },
    seen: {
      type: Boolean,
      default: false,
    },
    sentOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Message =
  mongoose.models.Message || mongoose.model<IMessageDocument>("Message", messageSchema);
