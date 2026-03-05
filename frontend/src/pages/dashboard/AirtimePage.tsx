import FormRow from "@/components/FormRow";
import FormSelect from "@/components/FormSelect";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  clearState,
  completeFields,
  getAirtimeProvider,
  handleChange,
  handleChecked,
  handlePurpose,
  purchaseAirtime,
  type airtimeInitialState,
} from "@/features/airtime/airtimeSlice";
import type { AppDispatch, RootState } from "@/Store";
import { useEffect } from "react";
import { FaArrowRotateRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/logo-favicon.png";

const AirtimePage = () => {
  const {
    charge,
    provider,
    phoneNumber,
    amount,
    providerArr,
    subcategory_id,
    isloading,
    localLoading,
    ported,
  } = useSelector((store: RootState) => store.airtime);
  const dispatch = useDispatch<AppDispatch>();
  const handleAirtimeChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const name = e.target.name as keyof airtimeInitialState;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  const handleCheckedInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked ? "yes" : "no";
    dispatch(handleChecked(checked));
  };
  const handlePayment = () => {
    dispatch(
      purchaseAirtime({
        amount: Number(amount),
        charge,
        subcategory_id,
        phoneNumber,
        provider,
        ported,
      }),
    );
  };

  useEffect(() => {
    dispatch(completeFields(provider));
  }, [provider]);

  useEffect(() => {
    dispatch(clearState());
    dispatch(getAirtimeProvider(null));
  }, []);
  useEffect(() => {
    dispatch(handlePurpose(provider));
  }, [amount, provider]);
  if (isloading) {
    return (
      <section className="grid place-items-center h-screen">
        <img src={logo} alt="logo" className="animate-ping" />
      </section>
    );
  }
  return (
    <section className="h-screen py-8 px-4 md:px-8 lg:px-10">
      <PageTitle title="buy airtime" text="airtime" />
      <form className="max-w-2xl">
        <Card className="p-4">
          <FormSelect
            lists={providerArr}
            placeholder="select provider"
            name="provider"
            value={provider}
            handleChange={handleAirtimeChange}
          />
          <FormRow
            name="amount"
            type="number"
            value={amount}
            handleChange={handleAirtimeChange}
          />
          <FormRow
            name="phoneNumber"
            type="text"
            label="phone number"
            placeholder="phone"
            value={phoneNumber}
            handleChange={handleAirtimeChange}
          />
          {/* CHECKED BOX */}
          <div className="flex gap-4 capitalize">
            <h2>is your number ported?</h2>
            <input
              checked={ported === "yes"}
              onChange={handleCheckedInput}
              type="checkbox"
            />
          </div>
          <FormRow
            name="charge"
            type="text"
            label="charge"
            disabled={true}
            value={charge}
          />
          <Button
            type="button"
            onClick={handlePayment}
            className="capitalize cursor-pointer"
            disabled={localLoading}
          >
            {localLoading ? (
              <span className="animate-spin">
                <FaArrowRotateRight />
              </span>
            ) : (
              "purchase airtime"
            )}
          </Button>
        </Card>
      </form>
    </section>
  );
};

export default AirtimePage;
