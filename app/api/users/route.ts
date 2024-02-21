import { connectDB } from "@/mongoDB"
import { User } from "@/mongoDB/models/user.model";

export const GET = async (req: Request) => {
    try {
        // Connect to Database
        await connectDB();

        // Fetch all users from database
        const allUsers = await User.find().select("-password");
        return new Response(JSON.stringify({ message: "All users", users: allUsers }), { status: 200 });
    } catch (error) {
        console.log("Failed to fetch all users", error);
        return new Response(JSON.stringify({ message: "Internal Server Error", users: null }), { status: 500 });
    }
}