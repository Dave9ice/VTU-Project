import AdminBtnContainer from "@/components/AdminBtnContainer";
import AdminForm from "@/components/AdminForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchTransaction } from "@/features/transaction/transactionSlice";
import type { AppDispatch, RootState } from "@/Store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TransactionPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, status, sort, page } = useSelector(
    (store: RootState) => store.transaction,
  );
  useEffect(() => {
    dispatch(fetchTransaction({ status, sort, page }));
  }, [page]);
  if (transactions.length < 1) {
    return (
      <h2 className="text-3xl text-center capitalize">
        no transactions to display
      </h2>
    );
  }
  return (
    <section className="md:px-6 py-8">
      {/* Form */}
      <AdminForm />
      <Table className="mt-4">
        <TableHeader>
          <TableRow className="capitalize text-lg font-bold">
            <TableHead>user</TableHead>
            <TableHead>transaction ID</TableHead>
            <TableHead>status</TableHead>
            <TableHead>created At</TableHead>
            <TableHead>payment method</TableHead>
            <TableHead>verified via</TableHead>
            <TableHead>amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((item) => {
            const {
              status,
              user,
              amount,
              trx_id,
              verifiedvia,
              createdAt,
              paymentMethod,
            } = item;
            return (
              <TableRow
                key={createdAt}
                className={`${status === "Pending" ? "bg-red-500" : "bg-green-500"}`}
              >
                <TableCell>{user}</TableCell>
                <TableCell>{trx_id}</TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>{createdAt}</TableCell>
                <TableCell>{paymentMethod}</TableCell>
                <TableCell>{verifiedvia}</TableCell>
                <TableCell>{amount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* FOOTER */}
      <AdminBtnContainer />
    </section>
  );
};

export default TransactionPage;
