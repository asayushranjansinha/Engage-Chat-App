interface AuthFormProps {
    type: "register" | "login"
    userData: {
        username: string;
        email: string;
        password: string;
    }
}