import FormRow from "@/components/FormRow";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { clearState, loginUser } from "@/features/user/userSlice";
import type { AppDispatch, RootState } from "@/Store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
// import favicon from "../assets/images/logo-favicon.png";
import { toast } from "sonner";
import { FaArrowRotateRight } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

type loginState = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [values, setValues] = useState<loginState>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
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
    dispatch(clearState());
  }, []);
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
        <Card className="p-8 gap-0">
          <CardTitle className="text-center capitalize text-2xl md:text-3xl text-gray-950">
            Hello! Welcome back
          </CardTitle>
          <p className="bg-destructive">{registermsg}</p>
          <FormRow
            type="email"
            name="email"
            placeholder="your email@gmail.com"
            value={values.email}
            handleChange={handleChange}
          />
          <div className="grid gap-y-2.5">
            <label htmlFor="password" className="capitalize">
              password
            </label>
            <div className="flex">
              <Input
                type={`${showPassword ? "text" : "password"}`}
                value={values.password}
                name="password"
                placeholder="password"
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
          </div>
          <Button className="capitalize mt-4" disabled={isLoading}>
            {isLoading ? (
              <span className="animate-spin">
                <FaArrowRotateRight />
              </span>
            ) : (
              "login"
            )}
          </Button>
          <div className="flex gap-x-4">
            <button className="text-center cursor-pointer hover:text-gray-500 hover:underline capitalize">
              <Link to="/register">create an account</Link>
            </button>
            <button className="text-center cursor-pointer hover:text-gray-500 hover:underline capitalize">
              <Link to="/forgot-password">forgot password?</Link>
            </button>
          </div>
        </Card>
      </form>
    </section>
  );
};

export default LoginPage;
