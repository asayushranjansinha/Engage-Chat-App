import SignInForm from "@/components/forms/signin";

const LoginPage = () => {
  const defaultValues = {
    username: "",
    password: "",
  };
  return <SignInForm defaultValues={defaultValues}/>;
};

export default LoginPage;
