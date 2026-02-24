import FormRow from "@/components/FormRow";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import favicon from "../assets/images/logo-favicon.png";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/Store";
import type { userInitialState } from "@/utils/types";
import {
  clearState,
  forgotPasswordRequest,
  handleChange,
} from "@/features/user/userSlice";
import { GrStatusGood } from "react-icons/gr";
import { useEffect } from "react";

const ForgotPasswordPage = () => {
  const { email, isLoading, succesMsg } = useSelector(
    (store: RootState) => store.user,
  );
  const dispatch = useDispatch<AppDispatch>();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof userInitialState;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  useEffect(() => {
    dispatch(clearState());
  }, []);
  if (succesMsg) {
    return (
      <section className="h-screen grid place-items-center bg-secondary">
        <div className="grid">
          <span className="text-7xl justify-self-center text-primary">
            <GrStatusGood />
          </span>
          <p className="capitalize font-bold">{succesMsg}</p>
        </div>
      </section>
    );
  }
  return (
    <section className="grid place-items-center h-screen bg-secondary">
      <form className="w-4/5 max-w-3xl">
        <Card className="p-8">
          <h2 className="text-center capitalize sm:text-2xl md:text-3xl flex gap-4 justify-center items-center">
            <img src={favicon} alt="logo" />
            forgot password
          </h2>
          <FormRow
            type="email"
            name="email"
            placeholder="your email@gmail.com"
            value={email}
            handleChange={handleInputChange}
          />
          <Button
            type="button"
            onClick={() => dispatch(forgotPasswordRequest({ email }))}
            className="cursor-pointer"
          >
            {isLoading ? "loading..." : "forgot password"}
          </Button>
        </Card>
      </form>
    </section>
  );
};

export default ForgotPasswordPage;
