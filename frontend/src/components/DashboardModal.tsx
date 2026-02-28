import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  createVirtualAccountNumber,
  handleChange,
  type accountInitialState,
} from "@/features/account/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/Store";
import { useNavigate } from "react-router-dom";
import { FaArrowRotateRight } from "react-icons/fa6";

const DashboardModal = () => {
  const [toggle, setToggle] = useState({
    toggleCard: false,
    toggleBank: false,
  });
  const [cardAmount, setCardAmount] = useState("");
  const { amount, isLoading } = useSelector(
    (store: RootState) => store.account,
  ) as {
    amount: number;
    isLoading: boolean;
    accountNumber: string;
    bankName: string;
  };
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleChangeFn = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const name = e.target.name as keyof accountInitialState;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const createVirtualAccountNumberFn = async () => {
    const resultAction = await dispatch(createVirtualAccountNumber({ amount }));
    if (createVirtualAccountNumber.fulfilled.match(resultAction)) {
      navigate("/payment");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="uppercase bg-primary rounded-full text-white p-2 cursor-pointer">
        fund wallet
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="">
            <button>fund wallet</button>
          </DialogTitle>
        </DialogHeader>
        <section>
          <header className="flex">
            <div className=" flex items-center gap-3 capitalize">
              <button
                className={`w-4 h-4 rounded-full border-2 p-2 ${
                  toggle.toggleCard ? "bg-primary" : ""
                }`}
                onClick={() => {
                  setToggle({
                    toggleBank: false,
                    toggleCard: !toggle.toggleCard,
                  });
                }}
              />
              <h2>pay with atm card</h2>
            </div>
          </header>
          <Separator />
          <div className={`${toggle.toggleCard ? "block" : "hidden"}`}>
            <p className={`${cardAmount === "" ? "hidden" : ""}`}>
              {" "}
              you will receive {Number(amount) - 50}
            </p>
            <Input
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setCardAmount(e.target.value)}
            />
          </div>
        </section>
        <section>
          <header className="flex">
            <div className="flex items-center gap-3 capitalize">
              <button
                className={`w-4 h-4 rounded-full border-2 p-2 ${
                  toggle.toggleBank ? "bg-primary" : ""
                }`}
                onClick={() => {
                  setToggle({
                    toggleCard: false,
                    toggleBank: !toggle.toggleBank,
                  });
                }}
              />
              <h2>pay with bank transfer</h2>
            </div>
          </header>
          <Separator />
          <div className={`${toggle.toggleBank ? "block" : "hidden"}`}>
            <p className={`${!amount ? "hidden" : ""}`}>
              {" "}
              {/* you will receive {Number(amount) - 50} */}
            </p>
            <Input
              type="number"
              name="amount"
              value={amount}
              onChange={handleChangeFn}
            />
          </div>
        </section>
        <div className=" flex gap-4">
          <Button>cancel</Button>
          <Button
            disabled={cardAmount === ""}
            className={`${toggle.toggleCard ? "" : "hidden"}`}
          >
            {isLoading ? (
              <span className="animate-spin">
                <FaArrowRotateRight />
              </span>
            ) : (
              "process"
            )}
          </Button>
          {/* bank transfer button */}
          <Button
            onClick={createVirtualAccountNumberFn}
            disabled={!amount || isLoading === true}
            className={`${toggle.toggleBank ? "" : "hidden"}`}
          >
            {isLoading ? (
              <span className="animate-spin">
                <FaArrowRotateRight />
              </span>
            ) : (
              "proceed"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardModal;
