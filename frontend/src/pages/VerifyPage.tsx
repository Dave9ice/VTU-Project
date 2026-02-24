import FormRow from "@/components/FormRow";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  clearState,
  handleChange,
  verifyUser,
} from "@/features/user/userSlice";
import type { AppDispatch, RootState } from "@/Store";
import type { userInitialState } from "@/utils/types";
import { useLocation } from "react-router-dom";

import { useEffect } from "react";
import { GrStatusGood } from "react-icons/gr";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const VerifyPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const email = location.state?.email;
  const { succesMsg, isLoading, otp } = useSelector(
    (store: RootState) => store.user,
  );
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof userInitialState;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  const handleSubmit = () => {
    if (!otp || otp === "") {
      return toast("please provide otp");
    }

    dispatch(verifyUser({ token: otp, email }));
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
  // remember to include unsuccesful verification
  return (
    <main className="bg-secondary h-screen grid place-items-center">
      <form className="w-full max-w-2xl px-4">
        <Card className="px-4">
          <h2 className="text-2xl text-center">verify user</h2>
          <FormRow
            name="otp"
            value={otp}
            label="otp code"
            type="number"
            handleChange={handleInputChange}
          />
          <Button
            type="button"
            className="capitalize cursor-pointer"
            onClick={handleSubmit}
          >
            {isLoading ? "verifying..." : "verify user"}
          </Button>
        </Card>
      </form>
    </main>
  );
};

export default VerifyPage;
