import React from "react";
import FormSelect from "./FormSelect";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/Store";
import {
  fetchTransaction,
  handleChange,
  type TXinitialStateType,
} from "@/features/transaction/transactionSlice";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const AdminForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, sort, status } = useSelector(
    (store: RootState) => store.transaction,
  );
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      handleChange({
        name: e.target.name as keyof TXinitialStateType,
        value: e.target.value,
      }),
    );
  };
  return (
    <form className="bg-secondary rounded-md">
      <Card className="flex flex-row justify-between items-center px-4 py-2">
        <FormSelect
          handleChange={handleSelectChange}
          lists={["latest", "oldest"]}
          name="sort"
          value={sort}
          placeholder="sort"
        />
        <FormSelect
          handleChange={handleSelectChange}
          lists={["Successful", "Pending", "Expired"]}
          name="status"
          value={status}
          placeholder="status"
        />
        <Button
          className=""
          type="button"
          onClick={() => dispatch(fetchTransaction({ status, sort }))}
        >
          {isLoading ? "searching..." : "search"}
        </Button>
      </Card>
    </form>
  );
};

export default AdminForm;
