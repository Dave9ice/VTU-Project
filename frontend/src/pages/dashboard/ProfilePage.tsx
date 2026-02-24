import FormRow from "@/components/FormRow";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { handleChange, resetPassword } from "@/features/user/userSlice";
import type { AppDispatch, RootState } from "@/Store";
import type { userInitialState } from "@/utils/types";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const ProfilePage = () => {
  const { user, newPassword, password } = useSelector(
    (store: RootState) => store.user,
  );

  const dispatch = useDispatch<AppDispatch>();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof userInitialState;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  const handleSubmit = () => {
    if (!password || !newPassword) {
      toast("please fill all fields");
    }
    dispatch(resetPassword({ password, newPassword }));
  };
  return (
    <main className="h-screen py-10 px-4 md:px-8 lg:px-10">
      <PageTitle text="profile" title="Profile" />
      <Table className="capitalize text-xl border-3">
        <TableHeader>
          <TableRow>
            <TableHead>Profile Info</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell>
              {user?.lastName} {user?.firstName}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Wallet</TableCell>
            <TableCell>{user?.wallet}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>{user?.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Phone number</TableCell>
            <TableCell>{user?.phoneNumber}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>join date</TableCell>
            <TableCell>{`${!user ? "null" : new Date(user.joinDate)}`}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <form className="mt-8">
        <Card className="px-4 max-w-2xl">
          <h2 className="capitalize text-center font-bold text-2xl">
            change password
          </h2>
          <FormRow
            name="password"
            type="password"
            value={password}
            handleChange={handleInputChange}
          />
          <FormRow
            name="newPassword"
            type="password"
            value={newPassword}
            handleChange={handleInputChange}
          />
          <Button type="button" onClick={handleSubmit} className="">
            change password
          </Button>
        </Card>
      </form>
    </main>
  );
};

export default ProfilePage;
