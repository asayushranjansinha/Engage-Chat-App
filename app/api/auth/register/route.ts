import { connectDB } from '@/mongoDB/index';
import { User } from '@/mongoDB/models/user.model';

export const POST = async (req: Request) => {
    try {
        // Connect to Database
        await connectDB();

        // Extract details from request body
        const body = await req.json();
        const { username, email, password } = body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(
                JSON.stringify({ message: "User already registered", data: null }),
                { status: 409 }
            );
        }

        // Create a new user
        const user = await User.create({ username, email, password, });

        // Again fetch newly created user from database and filter sensitive information
        const createdUser = await User
            .findById(user._id)
            .select("-password");

        if (!createdUser) {
            return new Response(
                JSON.stringify({ message: "Internal server error", data: null }),
                { status: 500 }
            );
        }

        // Return a successfull response 
        return new Response(
            JSON.stringify({ message: "User signup successful.", data: null }),
            { status: 201 }
        );
    } catch (err: any) {
        console.log("Failed to create user: ", err);

        // Return failure response 
        return new Response(
            JSON.stringify({ message: "Internal server error", data: null }),
            { status: 500 }
        );
    }
};
