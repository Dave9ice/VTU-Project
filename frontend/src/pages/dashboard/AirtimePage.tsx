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
  handlePurpose,
  purchaseAirtime,
  type airtimeInitialState,
} from "@/features/airtime/airtimeSlice";
import type { AppDispatch, RootState } from "@/Store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AirtimePage = () => {
  const { charge, provider, phoneNumber, amount, providerArr, subcategory_id } =
    useSelector((store: RootState) => store.airtime);
  // console.log(provider);
  const dispatch = useDispatch<AppDispatch>();
  const handleAirtimeChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = e.target.name as keyof airtimeInitialState;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const handlePayment = () => {
    dispatch(
      purchaseAirtime({
        amount: Number(amount),
        charge,
        subcategory_id,
        phoneNumber,
      })
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
  }, [amount]);
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
          <FormRow
            name="charge"
            type="text"
            label="charge"
            disabled={true}
            value={charge}
          />
          <Button type="button" onClick={handlePayment}>
            process
          </Button>
        </Card>
      </form>
    </section>
  );
};

export default AirtimePage;
