import FormRow from "@/components/FormRow";
import FormSelect from "@/components/FormSelect";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  checkElectricProviderPercentage,
  clearState,
  handleChange,
  payElectricBills,
  verifyMeterNo,
  type electricityInitialState,
} from "@/features/electricity/electricitySlice";
import type { AppDispatch, RootState } from "@/Store";
import { ElectricProvider } from "@/utils/links";
import React, { useEffect } from "react";
import { FaArrowRotateRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/logo-favicon.png";

const ElectricityPage = () => {
  const {
    electricProvider,
    electricProviderType,
    amount,
    charge,
    phoneNumber,
    meterNumber,
    verifyResult,
    isLoading,
    localLoading,
    verifyLoading,
  } = useSelector((store: RootState) => store.electricity);
  const dispatch = useDispatch<AppDispatch>();

  const handleElectricChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const name = e.target.name as keyof electricityInitialState;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const handleBillsPayment = () => {
    // if (!verifyResult) {
    //   return toast("please verify your meter number");
    // }
    dispatch(
      payElectricBills({
        electricProvider,
        electricProviderType,
        amount: Number(amount),
        charge,
        phoneNumber,
        meterNumber,
      }),
    );
  };

  useEffect(() => {
    if (electricProvider) {
      dispatch(checkElectricProviderPercentage(electricProvider));
    }
  }, [electricProvider, amount]);

  useEffect(() => {
    dispatch(clearState());
  }, []);
  if (isLoading) {
    return (
      <section className="grid place-items-center h-screen">
        <img src={logo} alt="logo" className="animate-ping" />
      </section>
    );
  }
  return (
    <section className="h-screen py-8 px-4 md:px-8 lg:px-10">
      <PageTitle title="Electricity Bill" text="electricity bill" />
      <form className="max-w-3xl">
        <Card className="p-4 grid md:grid-cols-2 ">
          <FormSelect
            lists={ElectricProvider}
            name="electricProvider"
            value={electricProvider}
            title="select electricity provider"
            placeholder="electricity provider"
            handleChange={handleElectricChange}
          />
          <FormSelect
            lists={["Prepaid", "Postpaid"]}
            name="electricProviderType"
            value={electricProviderType}
            title="choose package"
            placeholder="choose package"
            handleChange={handleElectricChange}
          />
          <FormRow
            name="amount"
            value={amount}
            type="number"
            handleChange={handleElectricChange}
          />
          <FormRow
            type="number"
            name="phoneNumber"
            value={phoneNumber}
            label="phone number"
            handleChange={handleElectricChange}
          />
          <div>
            <FormRow
              type="number"
              name="meterNumber"
              value={meterNumber}
              label="meter number"
              handleChange={handleElectricChange}
            />
            <Button
              type="button"
              disabled={verifyLoading}
              className="mt-2"
              onClick={() =>
                dispatch(
                  verifyMeterNo({
                    cardno: meterNumber,
                    plan: electricProvider,
                    type: electricProviderType,
                  }),
                )
              }
            >
              {verifyLoading ? (
                <span className="animate-spin">
                  <FaArrowRotateRight />
                </span>
              ) : (
                "verify"
              )}
            </Button>
            <p
              className={`${
                verifyResult !== ""
                  ? "bg-primary text-sm text-gray-300 p-1.5 mt-2 rounded-xl"
                  : ""
              }`}
            >
              {verifyResult}
            </p>
          </div>
          <FormRow type="number" name="charge" value={charge} disabled={true} />
          <Button
            type="button"
            onClick={handleBillsPayment}
            disabled={isLoading}
            className="cursor-pointer capitalize"
          >
            {localLoading ? (
              <span className="animate-spin">
                <FaArrowRotateRight />
              </span>
            ) : (
              "purchase electricity"
            )}
          </Button>
        </Card>
      </form>
    </section>
  );
};

export default ElectricityPage;
