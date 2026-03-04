import { Button } from "@/components/ui/button";
import {
  clearState,
  forgotPassword,
  handleChange,
} from "@/features/user/userSlice";
import type { AppDispatch, RootState } from "@/Store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { type userInitialState } from "@/utils/types";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { GrStatusGood } from "react-icons/gr";
import { FaArrowRotateRight } from "react-icons/fa6";
import { Eye, EyeOff } from "lucide-react";

const ForgottenPasswordEmailVerification = () => {
  const [searchParams, _setSearchParams] = useSearchParams();
  const [confirmPassword, setConfirmPassword] = useState("");
  const { password, succesMsg, isLoading } = useSelector(
    (store: RootState) => store.user,
  );
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = searchParams.get("token") as string;
  const email = searchParams.get("email") as string;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof userInitialState;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  const confirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmit = () => {
    if (!password || !confirmPassword) {
      return toast("please provide both fields");
    }
    if (password !== confirmPassword) {
      return toast("passwords does not match please re-type password");
    }

    dispatch(forgotPassword({ password, email, token, confirmPassword }));
  };
  useEffect(() => {
    dispatch(clearState());
  }, []);
  useEffect(() => {
    if (succesMsg) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [succesMsg]);
  if (succesMsg) {
    <section className="h-screen grid place-items-center bg-secondary">
      <div className="grid">
        <span className="text-7xl justify-self-center text-primary">
          <GrStatusGood />
        </span>
        <p className="capitalize font-bold">{succesMsg}</p>
      </div>
    </section>;
  }
  return (
    <section className="h-screen place-items-center bg-secondary grid px-4">
      <Card className="w-full max-w-2xl p-4">
        <form>
          <div className="grid gap-y-2.5">
            <label htmlFor="password" className="capitalize">
              password
            </label>
            <div className="flex">
              <Input
                type={`${showPassword ? "text" : "password"}`}
                value={password}
                name="password"
                placeholder="password"
                onChange={handleInputChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
          </div>
          <div className="grid gap-y-2.5">
            <label htmlFor="password" className="capitalize">
              password
            </label>
            <div className="flex">
              <Input
                type={`${showPassword ? "text" : "password"}`}
                value={confirmPassword}
                name="password"
                placeholder="password"
                onChange={confirmPasswordChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
          </div>
          <Button
            disabled={isLoading}
            type="button"
            onClick={handleSubmit}
            className="w-full mt-4 capitalize cursor-pointer"
          >
            {isLoading ? (
              <span className="animate-spin">
                <FaArrowRotateRight />
              </span>
            ) : (
              "change password"
            )}
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default ForgottenPasswordEmailVerification;
