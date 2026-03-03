import FormRow from "@/components/FormRow";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { clearState, registerUser } from "@/features/user/userSlice";
import type { AppDispatch, RootState } from "@/Store";
import React, { useEffect, useState } from "react";
import { FaArrowRotateRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type registerValues = {
  firstName: string;
  lastName: string;
  password: string;
  verifyPassword: string;
  email: string;
  phoneNumber: string;
};
const RegisterPage = () => {
  const [values, setVaues] = useState<registerValues>({
    firstName: "",
    lastName: "",
    password: "",
    verifyPassword: "",
    email: "",
    phoneNumber: "",
  });
  // console.log(values);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, succesMsg, email } = useSelector(
    (store: RootState) => store.user,
  );
  // console.log(succesMsg, email);
  const registerFn = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      verifyPassword,
      password,
      phoneNumber,
    } = values;
    if (!firstName || !lastName || !email || !verifyPassword || !password) {
      return toast("please provide all fields");
    }
    if (password !== verifyPassword) {
      toast("password do not match");
      return;
    }
    dispatch(
      registerUser({ firstName, lastName, email, password, phoneNumber }),
    );
    // return setVaues({
    //   firstName: "",
    //   lastName: "",
    //   password: "",
    //   verifyPassword: "",
    //   email: "",
    //   phoneNumber: "",
    // });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setVaues({ ...values, [name]: value });
  };
  useEffect(() => {
    dispatch(clearState());
  }, []);
  useEffect(() => {
    if (succesMsg) {
      // const email = "hello@gmail.c;
      navigate(`/verify-account`, { state: { email } });
      dispatch(clearState());
    }
  }, [succesMsg]);
  return (
    <section className="grid place-items-center h-screen bg-secondary">
      <form className="w-4/5 max-w-3xl" onSubmit={registerFn}>
        <Card className="p-8 gap-0">
          <h2 className="capitalize text-center text-2xl sm:text-2xl md:text-4xl tracking-tighter">
            hello! let get started
          </h2>
          <h3 className="text-xs mb-4 capitalize text-center md:text-sm">
            start by creating an account
          </h3>
          <FormRow
            name="firstName"
            type="text"
            placeholder="First Name"
            label="first name"
            value={values.firstName}
            handleChange={handleChange}
          />
          <FormRow
            name="lastName"
            type="text"
            placeholder="Last Name"
            label="Last Name"
            value={values.lastName}
            handleChange={handleChange}
          />
          <FormRow
            name="email"
            type="email"
            placeholder="Email address"
            value={values.email}
            handleChange={handleChange}
          />
          <FormRow
            name="phoneNumber"
            type="number"
            placeholder="provide phone number"
            value={values.phoneNumber}
            handleChange={handleChange}
          />
          <FormRow
            name="password"
            type="password"
            value={values.password}
            handleChange={handleChange}
          />
          <FormRow
            name="verifyPassword"
            type="password"
            label="verify password"
            value={values.verifyPassword}
            handleChange={handleChange}
          />
          <Button
            className="capitalize mt-4 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-spin">
                <FaArrowRotateRight />
              </span>
            ) : (
              "register"
            )}
          </Button>
          <button className="text-center cursor-pointer hover:text-gray-500">
            <Link to="/login">already have account?</Link>
          </button>
        </Card>
      </form>
    </section>
  );
};

export default RegisterPage;
