import mongoose, { Document } from "mongoose";

export interface IRegisterFormProps {
    defaultValues: {
        username: string;
        email: string;
        password: string;
    }
}
export interface ILoginFormProps {
    defaultValues: {
        username: string;
        password: string;
    }
}
export interface IUser extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    username: string;
    email: string;
    image: string;
    profileImage: string;
    chats: mongoose.Schema.Types.ObjectId[];
}
export interface IProfilePageProps extends IUser{}