import FormRow from "@/components/FormRow";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  handleChange,
  requestOtp,
  verifyUser,
} from "@/features/user/userSlice";
import type { AppDispatch, RootState } from "@/Store";
import type { userInitialState } from "@/utils/types";
import { Link, useLocation } from "react-router-dom";

// import { useEffect } from "react";
import { GrStatusGood } from "react-icons/gr";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { MdCancel } from "react-icons/md";
import { FaArrowRotateRight } from "react-icons/fa6";
import { useEffect } from "react";
import { useTimer } from "@/hooks/countdown";

const VerifyPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const email = location.state?.email;
  const { succesMsg, isLoading, otp, errorMsg, verifyLoading, otpCodeSent } =
    useSelector((store: RootState) => store.user);
  const { seconds, formattedTime, restartTimer } = useTimer(180);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof userInitialState;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  const requestOtpFn = () => {
    dispatch(requestOtp({ email }));
  };
  const handleSubmit = () => {
    if (!otp || otp === "") {
      return toast("please provide otp");
    }

    dispatch(verifyUser({ token: otp, email }));
  };
  useEffect(() => {
    restartTimer();
  }, [otpCodeSent]);

  if (succesMsg) {
    return (
      <section className="h-screen grid place-items-center bg-secondary">
        <div className="grid">
          <span className="text-7xl justify-self-center text-primary">
            <GrStatusGood />
          </span>
          <p className="capitalize font-bold">{succesMsg}</p>
          <Button asChild className="mt-6">
            <Link to={"/login"} className="capitalize">
              back to login
            </Link>
          </Button>
        </div>
      </section>
    );
  }
  // remember to include unsuccesful verification
  if (errorMsg) {
    return (
      <section className="h-screen grid place-items-center bg-secondary">
        <div className="grid">
          <span className="text-7xl justify-self-center text-destructive">
            <MdCancel />
          </span>
          <p className="capitalize font-bold">{errorMsg}</p>
          <Button asChild className="mt-6">
            <Link to={"/register"} className="capitalize">
              go back to register
            </Link>
          </Button>
        </div>
      </section>
    );
  }
  return (
    <main className="bg-secondary h-screen grid place-items-center">
      <form className="w-full max-w-2xl px-4">
        <Card className="px-4 gap-3 relative">
          <h2 className="text-2xl text-center  capitalize">
            let verify your email
          </h2>
          <h3 className="text-xs text-center text-destructive">
            kindly enter the four digit number sent to your email to verify your
            account
          </h3>
          <h2 className="absolute top-4 right-4">{formattedTime}</h2>
          <div className="grid capitalize">
            <label>email</label>
            <input
              type="text"
              disabled={email !== ""}
              value={email}
              className="border rounded-sm p-1.5"
            />
          </div>
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
            {isLoading ? (
              <span className="animate-spin">
                <FaArrowRotateRight />
              </span>
            ) : (
              "verify"
            )}
          </Button>
          <Button
            onClick={requestOtpFn}
            className="mt-2 bg-destructive"
            disabled={verifyLoading || seconds > 0}
          >
            {verifyLoading ? (
              <span className="animate-spin">
                <FaArrowRotateRight />
              </span>
            ) : (
              "i did not receive otp"
            )}
          </Button>
        </Card>
      </form>
    </main>
  );
};

export default VerifyPage;
