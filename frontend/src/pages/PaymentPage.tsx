import { Card } from "@/components/ui/card";
import type { AppDispatch, RootState } from "@/Store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { fetchTransactionStatus } from "@/features/account/accountSlice";
import { useEffect, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGetTransactionStatusQuery } from "@/features/polling/apiSlice";
import { useCountdown } from "@/hooks/countdown";
import { formatTime } from "@/utils/localStorage";

const PaymentPage = () => {
  const { accountNumber, bankName, amount, trx_ref, expiresIn } = useSelector(
    (state: RootState) => state.account,
  );
  const [pollingInterval, setPollingInterval] = useState(0);
  const { data, isSuccess } = useGetTransactionStatusQuery(trx_ref, {
    skip: !trx_ref,
    pollingInterval,
  });
  const secondsRemaining = useCountdown(expiresIn);
  // console.log("RAW expiresAt:", expiresIn);
  // console.log("Parsed expiresAt:", new Date(expiresIn));
  // console.log("Parsed ISO:", new Date(expiresIn).toISOString());
  // console.log("Now ISO:", new Date().toISOString());
  //   POLLING
  useEffect(() => {
    if (!isSuccess) return;

    if (data?.transaction?.status === "Pending") {
      setPollingInterval(5000); // start polling
    } else {
      setPollingInterval(0); // stop polling
    }
  }, [data, isSuccess]);
  const dispatch = useDispatch<AppDispatch>();
  const handleFetch = () => {
    dispatch(fetchTransactionStatus({ trx_ref }));
  };

  if (data?.transaction?.status === "Successful") {
    return (
      <section className="bg-secondary h-screen grid place-items-center">
        <Card className=" w-full max-w-3xl grid text-center bg-green-100 shadow-2xl p-4">
          <h2 className="text-7xl justify-self-center text-green-800">
            <IoCheckmarkCircle />
          </h2>
          <h2>payment Successful</h2>
          <p>
            your payment has been successfully processed now you can return back
            to homepage to perform transactions
          </p>
          <Button>
            <Link to={`/dashboard`}>continue to homepage</Link>
          </Button>
        </Card>
      </section>
    );
  }

  return (
    <section className="bg-secondary h-screen grid place-items-center">
      <Card className="capitalize px-5 w-full max-w-3xl">
        <div className="bg-gray-100 flex justify-between">
          <div>
            {" "}
            <h1 className="text-xs md:text-sm">amount to pay</h1>
            <h1 className="font-bold text-lg">#{amount}.00</h1>
          </div>
          <p>time remaining: {formatTime(secondsRemaining as number)}</p>
        </div>
        <p className="text-xs md:text-sm text-center">
          transfer to the account detail's below
        </p>
        <div className="bg-destructive-foreground  text-center">
          <h1 className="text-center capitalize"> {bankName}</h1>
          <h1 className=""> {accountNumber}</h1>
          <p className="text-xs text-destructive">
            do not save this account number
          </p>
          <h1>account name</h1>
          <h1>Biggie Sub</h1>
        </div>
        <Button
          className="bg-destructive capitalize cursor-pointer"
          onClick={handleFetch}
        >
          i have transfered the money
        </Button>
      </Card>
    </section>
  );
};

export default PaymentPage;
