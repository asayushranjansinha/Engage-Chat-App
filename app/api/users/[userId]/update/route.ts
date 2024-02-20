import { connectDB } from "@/mongoDB"
import { User } from "@/mongoDB/models/user.model";

export const PUT = async (req: Request, { params }: { params: { userId: string } }) => {
    try {
        // Connect to Database
        await connectDB();

        // Extract userId from params
        const { userId } = params;

        // Extract body from request body
        const body = await req.json();
        const { name, username, password, profileImage } = body;

        // Update info
        const updates: {
            name?: string;
            username?: string;
            password?: string;
            profileImage?: string;
        } = {};
        
        if (name && name.trim() !== "") updates.name = name;
        if (username && username.trim() !== "") updates.username = username;
        if (password && password.trim() !== "") updates.password = password;
        if (profileImage) updates.profileImage = profileImage;
        

        // Search and update user in database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: updates
            },
            { new: true }
        ).select("-password");

        return new Response(JSON.stringify({ message: "User updated successfully", user: updatedUser }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ message: "Failed to update user", user: null }), { status: 500 })
    }
}