import PageTitle from "@/components/PageTitle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { RootState } from "@/Store";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { user } = useSelector((store: RootState) => store.user);
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
            <TableCell>{user?.joinDate}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
};

export default ProfilePage;
