import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const DashboardModal = () => {
  const [toggle, setToggle] = useState({
    toggleCard: false,
    toggleBank: false,
  });
  const [amount, setAmount] = useState("");
  const payWithMonify = () => {
    window.MonnifySDK.initialize({
      amount: 2000,
      currency: "NGN",
      reference: new String(new Date().getTime()),
      customerFullName: "john doe",
      customerEmail: "john@gmail.com",
      apiKey: "MK_TEST_92EKJVRS87",
      contractCode: "4455889008",
      paymentDescription: "Wallet Funding",
      isTestMode: true,
      onComplete: (response: any) => {
        console.log(response);
      },
      onClose: () => {
        console.log("payment modal closed");
      },
    });
  };
  return (
    <Dialog>
      <DialogTrigger>fund wallet</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <button>fund wallet</button>
          </DialogTitle>
        </DialogHeader>
        <section>
          <header className="flex">
            <input
              type="checkbox"
              name=""
              id=""
              onClick={() => {
                setToggle({
                  toggleCard: !toggle.toggleCard,
                  toggleBank: !toggle.toggleBank,
                });
              }}
            />
            <h2>pay with atm card</h2>
          </header>
          <div className={`${toggle.toggleBank ? "hidden" : "block"}`}>
            <p className={`${amount === "" ? "hidden" : ""}`}>
              {" "}
              you will receive {Number(amount) - 50}
            </p>
            <Input
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </section>
        <section>
          <header className="flex">
            <input
              type="checkbox"
              name=""
              id=""
              onClick={() => {
                setToggle({
                  toggleCard: !toggle.toggleCard,
                  toggleBank: !toggle.toggleBank,
                });
              }}
            />
            <h2>pay with bank transfer</h2>
          </header>
          <div
            className={`${toggle.toggleBank === false ? "hidden" : "block"}`}
          >
            <h2 className="text-center">
              PAY INTO ANY OF THESE ACCOUNTS BELOW, YOU CAN SAVE THIS AND
              TRANSFER TO IT ANYTIME
            </h2>
            <article>
              <h2 className="font-bold">palmpay</h2>
              <p>
                Charges - 0.4% per deposit, Eg Transfer 1000 and get funded 996,
                or transfer 100k and get funded 99,700
              </p>
              <h2>account number :</h2>
              <h2>account name :</h2>
              <Button>create account</Button>
            </article>
          </div>
        </section>
        <div className=" flex gap-4">
          <Button>cancel</Button>
          <Button disabled={amount === ""} onClick={payWithMonify}>
            proceed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardModal;
