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
import type { dataInitialState } from "@/utils/types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CablePage = () => {
  const {
    smartCardNumber,
    cable,
    cablePlans,
    isLoading,
    amount,
    charge,
    phoneNumber,
    selectedCablePlan,
    verifyResult,
    cableVariationCode,
  } = useSelector((store: RootState) => store.cable);
  const dispatch = useDispatch<AppDispatch>();
  const handleCableChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
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
      })
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
                  verifyCableCard({ cable, cableNumber: smartCardNumber })
                )
              }
            >
              {isLoading ? "verifying card..." : "verify"}
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
          <Button type="button" onClick={handlePayment}>
            process
          </Button>
        </Card>
      </form>
    </section>
  );
};

export default CablePage;
