import RegisterForm from "@/components/forms/register";

const Register = () => {
  const defaultValues = {
    username: "",
    email: "",
    password: "",
  };
  return <RegisterForm defaultValues={defaultValues}/>;
};

export default Register;
