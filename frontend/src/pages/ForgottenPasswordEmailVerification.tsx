import FormRow from "@/components/FormRow";
import { Button } from "@/components/ui/button";
import {
  clearState,
  forgotPassword,
  handleChange,
} from "@/features/user/userSlice";
import type { AppDispatch, RootState } from "@/Store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { type userInitialState } from "@/utils/types";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { GrStatusGood } from "react-icons/gr";

const ForgottenPasswordEmailVerification = () => {
  const [searchParams, _setSearchParams] = useSearchParams();
  const [confirmPassword, setConfirmPassword] = useState("");
  const { password, succesMsg } = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch<AppDispatch>();
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
          <FormRow
            name="password"
            type="password"
            value={password}
            label="change password"
            handleChange={handleInputChange}
          />
          <div>
            <label htmlFor="password" className="capitalize">
              confirm password
            </label>
            <Input
              type="password"
              value={confirmPassword}
              name="password"
              onChange={confirmPasswordChange}
            />
          </div>
          <Button
            type="button"
            onClick={handleSubmit}
            className="w-full mt-4 capitalize cursor-pointer"
          >
            change password
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default ForgottenPasswordEmailVerification;
