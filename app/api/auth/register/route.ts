import { connectDB } from '@/mongoDB/index';
import { User } from '@/mongoDB/models/user.model';

export const POST = async (req: Request) => {
    try {
        await connectDB();
        const body = await req.json();
        const { username, email, password } = body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response("User already exists!", { status: 409 });
        }

        // Create a new user
        const user = await User.create({
            username,
            email,
            password,
        })

        const createdUser = await User.findById(user._id).select("-password");

        if (!createdUser) {
            return new Response("Failed to create a new user", { status: 500 });
        }

        return new Response(JSON.stringify(createdUser), { status: 201 });
    } catch (err) {
        console.error(err);
        return new Response("Failed to create a new user", { status: 500 });
    }
};
