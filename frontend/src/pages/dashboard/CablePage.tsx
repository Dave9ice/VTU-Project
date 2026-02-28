import FormRow from "@/components/FormRow";
import FormSelect from "@/components/FormSelect";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  cablePayment,
  clearState,
  fetchCable,
  handleChange,
  handlePurpose,
  updateCableFields,
  verifyCableCard,
  type cableInitialState,
} from "@/features/cable/cableSlice";
import type { AppDispatch, RootState } from "@/Store";
import React, { useEffect } from "react";
import { FaArrowRotateRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/logo-favicon.png";

const CablePage = () => {
  const {
    smartCardNumber,
    localLoading,
    cable,
    cablePlans,
    isLoading,
    amount,
    charge,
    phoneNumber,
    selectedCablePlan,
    verifyResult,
    cableVariationCode,
    verifyLoading,
  } = useSelector((store: RootState) => store.cable);
  const dispatch = useDispatch<AppDispatch>();
  const handleCableChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const name = e.target.name as keyof cableInitialState;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const handlePayment = () => {
    dispatch(
      cablePayment({
        cable,
        amount: Number(amount),
        charge,
        phoneNumber,
        smartCardNumber,
        cableVariationCode,
      }),
    );
  };

  useEffect(() => {
    dispatch(fetchCable(cable));
  }, [cable]);
  useEffect(() => {
    dispatch(updateCableFields(selectedCablePlan));
    dispatch(handlePurpose(cable));
  }, [selectedCablePlan]);
  useEffect(() => {
    dispatch(clearState());
  }, []);
  if (isLoading) {
    return (
      <section className="grid place-items-center h-screen">
        <img src={logo} alt="logo" className="animate-bounce" />
      </section>
    );
  }
  return (
    <section className="h-screen py-8 px-4 md:px-8 lg:px-10">
      <PageTitle title="cable bills" text="cable bills" />
      <form className="max-w-3xl">
        <Card className="p-4">
          <div>
            <FormSelect
              lists={["gotv", "dstv", "startimes"]}
              name="cable"
              value={cable}
              title="choose cable"
              placeholder="choose cable"
              handleChange={handleCableChange}
            />
            <FormRow
              label="smart card number"
              placeholder="smart card number"
              name="smartCardNumber"
              type="number"
              value={smartCardNumber}
              handleChange={handleCableChange}
            />
            <Button
              className="mt-4 capitalize"
              type="button"
              onClick={() =>
                dispatch(
                  verifyCableCard({ cable, cableNumber: smartCardNumber }),
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
            <h2
              className={`${
                verifyResult !== ""
                  ? "bg-primary text-sm text-gray-300 p-1.5 mt-2 rounded-xl"
                  : ""
              }`}
            >
              {verifyResult}
            </h2>
          </div>
          <FormSelect
            lists={cablePlans}
            name="selectedCablePlan"
            value={selectedCablePlan}
            title="choose banquet"
            isLoading={isLoading}
            placeholder="choose banguet"
            handleChange={handleCableChange}
          />
          <FormRow name="amount" disabled={true} type="text" value={amount} />
          <FormRow
            type="number"
            name="phoneNumber"
            label="phone number"
            value={phoneNumber}
            handleChange={handleCableChange}
          />
          <FormRow type="text" name="charge" value={charge} disabled={true} />
          <Button
            type="button"
            onClick={handlePayment}
            className="capitalize cursor-pointer"
          >
            {localLoading ? (
              <span className="animate-spin">
                <FaArrowRotateRight />
              </span>
            ) : (
              "pay cable"
            )}
          </Button>
        </Card>
      </form>
    </section>
  );
};

export default CablePage;
