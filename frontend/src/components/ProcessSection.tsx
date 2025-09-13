import { alignment } from "./Navbar";
import { IoMdPersonAdd } from "react-icons/io";
import { FaCreditCard, FaSmileWink } from "react-icons/fa";
import { Card, CardContent, CardHeader } from "./ui/card";
const ProcessSection = () => {
  return (
    <section className="bg-gray-100 py-10">
      <h2 className="capitaliz text-primary text-center text-2xl my-4">
        enjoy our services in just three steps
      </h2>
      <div className={`${alignment} grid gap-6 md:grid-cols-3`}>
        <Card className="flex flex-row items-center text-gray-700">
          <CardHeader>
            <IoMdPersonAdd className="border-dashed border-2 text-5xl rounded-full border-primary p-1 bg-secondary" />
          </CardHeader>
          <CardContent>
            <h2 className=" capitalize font-bold text-3xl text-primary">
              1 <span className="text-2xl text-gray-600">signup</span>
            </h2>
            <p>
              Create A Free Online Account With Us And Get An Online Wallet.
            </p>
          </CardContent>
        </Card>
        <Card className="flex flex-row items-center text-gray-700">
          <CardHeader>
            <FaCreditCard className="border-dashed border-2 text-5xl rounded-full border-primary p-1 bg-secondary" />
          </CardHeader>
          <CardContent>
            <h2 className=" capitalize font-bold text-3xl text-primary">
              2 <span className="text-2xl text-gray-600">fund wallet</span>
            </h2>
            <p>
              Fund Your Wallet Using ATM Card, Cash Deposit, Online Transfer,
              etc.
            </p>
          </CardContent>
        </Card>
        <Card className="flex flex-row items-center text-gray-700">
          <CardHeader>
            <FaSmileWink className="border-dashed border-2 text-5xl rounded-full border-primary p-1 bg-secondary" />
          </CardHeader>
          <CardContent>
            <h2 className=" capitalize font-bold text-3xl text-primary">
              3 <span className="text-2xl text-gray-600">Enjoy Services</span>
            </h2>
            <p>Enjoy Our Services Charged From Your Wallet.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProcessSection;
