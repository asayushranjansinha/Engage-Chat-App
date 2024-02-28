import mongoose, { Document } from "mongoose";

export interface IRegisterFormProps {
    /**
   * Function to switch between tabs (e.g., login and registration)
   * 
   * @param {void} - No parameters are passed to the function.
   * @returns {void} - The function does not return any value.
   */
    switchTab: () => void;
}

export interface IUser extends Document {
    _id: string;
    username: string;
    name: string;
    email: string;
    image: string;
    profileImage: string;
    chats: mongoose.Schema.Types.ObjectId[];
}

export enum ConversationType {
    GROUP = 'group',
    INDIVIDUAL = 'individual',
}
export interface IProfilePageProps extends IUser { }