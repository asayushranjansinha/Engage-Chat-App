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
    _id:string;
    username: string;
    name: string;
    email: string;
    image: string;
    profileImage: string;
    chats: mongoose.Schema.Types.ObjectId[];
}
export interface IProfilePageProps extends IUser{}