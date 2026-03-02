import FormRow from "@/components/FormRow";
import FormSelect from "@/components/FormSelect";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { clearDataState, handleChange } from "@/features/data/dataSlice";
import type { RootState } from "@/Store";
import type { dataInitialState } from "@/utils/types";
import React, { useEffect } from "react";
import { FaArrowRotateRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/logo-favicon.png";

const ExamPage = () => {
  const {
    examType,
    resultType,
    resultTypeArr,
    amount,
    phoneNumber,
    isLoading,
    localLoading,
  } = useSelector((store: RootState) => store.data);
  const dispatch = useDispatch();
  const handleExamChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const name = e.target.name as keyof dataInitialState;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  useEffect(() => {
    dispatch(clearDataState());
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
      <PageTitle title="Exam Pin" text="text pin" />

      <form className="max-w-3xl">
        <Card className="p-4 grid md:grid-cols-2">
          <FormSelect
            lists={["WAEC", "NECO"]}
            name="examType"
            value={examType}
            title="select exam type"
            placeholder="select exam type"
            handleChange={handleExamChange}
          />
          <FormSelect
            lists={resultTypeArr}
            name="resultType"
            value={resultType}
            title="select result type"
            placeholder="select result type"
            handleChange={handleExamChange}
          />
          <FormRow name="amount" value={amount} type="number" disabled={true} />
          <FormRow name="phoneNumber" value={phoneNumber} type="number" />
          <Button disabled={isLoading}>
            {localLoading ? (
              <span className="animate-spin">
                <FaArrowRotateRight />
              </span>
            ) : (
              "purchase exam pin"
            )}
          </Button>
        </Card>
      </form>
    </section>
  );
};

export default ExamPage;
