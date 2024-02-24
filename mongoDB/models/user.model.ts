import bcrypt from 'bcrypt';
import mongoose from "mongoose";

export interface IUserDocument extends Document {
  _id:mongoose.Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  name: string;
  profileImageUrl?: string;
  online: boolean;
  lastActive?: Date;
  groups?: mongoose.Schema.Types.ObjectId[];
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    lowercase: true,
  },
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"]
  },
  name: {
    type: String,
    default: "",
  },
  profileImageUrl: {
    type: String,
    default: "",
  },
  online: {
    type: Boolean,
    default: false
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// methods
userSchema.pre("save", async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

export const User = mongoose.models.User || mongoose.model<IUserDocument>('User', userSchema);
