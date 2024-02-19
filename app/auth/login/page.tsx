import AuthForm from "@/components/forms/AuthForm";

const LoginPage = () => {
  const userData = {
    username: "",
    password: "",
    email: "",
  };
  return <AuthForm type="login" userData={userData} />;
};

export default LoginPage;
