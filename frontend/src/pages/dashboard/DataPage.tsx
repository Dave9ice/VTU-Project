import FormRow from "@/components/FormRow";
import FormSelect from "@/components/FormSelect";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  buyData,
  clearDataState,
  fetchData,
  fetchDataProvider,
  handleChange,
  updateDataFields,
} from "@/features/data/dataSlice";
import type { AppDispatch, RootState } from "@/Store";
import type { dataInitialState } from "@/utils/types";
import React, { useEffect } from "react";
import { FaArrowRotateRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/logo-favicon.png";

const DataPage = () => {
  const {
    provider,
    dataProviderArr,
    dataPlans,
    selectedPlan,
    isLoading,
    phoneNumber,
    amount,
    subCategoryId,
    localLoading,
  } = useSelector((store: RootState) => store.data);
  const dispatch = useDispatch<AppDispatch>();
  const handleDataChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const name = e.target.name as keyof dataInitialState;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const purchaseData = () => {
    dispatch(
      buyData({ amount, phoneNumber, subCategoryId, provider, selectedPlan }),
    );
  };

  useEffect(() => {
    dispatch(updateDataFields(selectedPlan));
  }, [selectedPlan]);

  useEffect(() => {
    dispatch(clearDataState());
    dispatch(fetchDataProvider(null));
  }, []);
  useEffect(() => {
    dispatch(fetchData(provider));
  }, [provider]);
  if (isLoading) {
    return (
      <section className="grid place-items-center h-screen">
        <img src={logo} alt="logo" className="animate-ping" />
      </section>
    );
  }
  return (
    <section className=" h-screen py-10 px-4 md:px-8 lg:px-10">
      <PageTitle title="purchase data" text="data" />
      <form className="  grid items-center  max-w-3xl ">
        <Card className="grid p-4 ">
          <FormSelect
            placeholder="Select Provider"
            lists={dataProviderArr}
            name="provider"
            value={provider}
            handleChange={handleDataChange}
          />
          <FormSelect
            placeholder="Select plan"
            lists={dataPlans}
            name="selectedPlan"
            value={selectedPlan}
            isLoading={isLoading}
            handleChange={handleDataChange}
          />
          <FormRow
            name="amount"
            type="number"
            label="amount"
            value={amount}
            disabled={true}
          />
          <FormRow
            name="phoneNumber"
            type="number"
            placeholder="please enter phone Number"
            label="phone number"
            value={phoneNumber}
            handleChange={handleDataChange}
          />

          <Button
            size="default"
            type="button"
            onClick={purchaseData}
            disabled={localLoading}
            className="capitalize"
          >
            {localLoading ? (
              <span className="animate-spin">
                <FaArrowRotateRight />
              </span>
            ) : (
              "purchase data"
            )}
          </Button>
        </Card>
      </form>
    </section>
  );
};

export default DataPage;
