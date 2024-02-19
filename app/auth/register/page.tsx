import AuthForm from "@/components/forms/AuthForm";

const Register = () => {
  const defaultValues = {
    username: "",
    email: "",
    password: "",
  };
  return <AuthForm type="register" userData={defaultValues} />;
};

export default Register;
