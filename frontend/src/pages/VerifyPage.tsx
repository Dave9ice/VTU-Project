import { Card } from "@/components/ui/card";
import { verifyUser } from "@/features/user/userSlice";
import type { AppDispatch, RootState } from "@/Store";
import { useEffect } from "react";
import { GrStatusGood } from "react-icons/gr";
import { MdCancel } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const VerifyPage = () => {
  const [searchParams, _setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { succesMsg, isLoading } = useSelector(
    (store: RootState) => store.user
  );
  const token = searchParams.get("token") as string;
  const email = searchParams.get("email") as string;
  //   console.log(token, email);
  useEffect(() => {
    dispatch(verifyUser({ token, email }));
  }, []);
  if (isLoading) {
    return <h2>verifying</h2>;
  }
  if (succesMsg) {
    return (
      <main className="bg-secondary h-screen grid place-items-center">
        <Card className="p-4 text-center w-3/4 grid capitalize tracking- max-w-3xl">
          <GrStatusGood className="justify-self-center text-7xl text-primary" />
          <h2 className="text-primary">
            congratulations on verifying your email!!!
          </h2>
          <p>{succesMsg}</p>
          {/* <p>welcome boss, glad to have you onboard, please login</p> */}
        </Card>
      </main>
    );
  }
  return (
    <main className="bg-secondary h-screen grid place-items-center">
      <Card className="p-4 text-center w-3/4 grid capitalize tracking- max-w-3xl">
        <MdCancel className="justify-self-center text-7xl text-primary" />
        <h2 className="text-primary">unable to verify email</h2>
        {/* <p>{succesMsg}</p> */}
        {/* <p>welcome boss, glad to have you onboard, please login</p> */}
      </Card>
    </main>
  );
};

export default VerifyPage;
