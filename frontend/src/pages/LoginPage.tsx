import FormRow from "@/components/FormRow";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { loginUser } from "@/features/user/userSlice";
import type { AppDispatch, RootState } from "@/Store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import favicon from "../assets/images/logo-favicon.png";
import { toast } from "sonner";

type loginState = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [values, setValues] = useState<loginState>({ email: "", password: "" });
  const [searchParams, _setSearchParams] = useSearchParams();

  const registermsg = searchParams.get("msg");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, user } = useSelector((store: RootState) => store.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { password, email } = values;
    if (!password || !email) {
      return toast("please provide email and password");
    }
    dispatch(loginUser({ email: values.email, password: values.password }));
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  }, [user]);
  return (
    <section className="grid place-items-center h-screen bg-secondary">
      <form className="w-4/5 max-w-3xl" onSubmit={handleSubmit}>
        <Card className="p-8">
          <h2 className="text-center capitalize sm:text-2xl md:text-3xl flex gap-4 justify-center items-center">
            <img src={favicon} alt="logo" />
            login
          </h2>
          <p className="bg-destructive">{registermsg}</p>
          <FormRow
            type="email"
            name="email"
            placeholder="your email@gmail.com"
            value={values.email}
            handleChange={handleChange}
          />
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />
          <Button className="capitalize" disabled={isLoading}>
            {isLoading ? "login In..." : "login"}
          </Button>
          <button className="text-center cursor-pointer hover:text-gray-500 hover:underline">
            <Link to="/register">create an account</Link>
          </button>
        </Card>
      </form>
    </section>
  );
};

export default LoginPage;
