import FormRow from "@/components/FormRow";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React, { useEffect } from "react";

declare global {
  interface Window {
    MonnifySDK: any;
  }
}

const PaymentPage: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.monnify.com/plugin/monnify.js";
    (script.async = true),
      (script.onload = () => {
        console.log("monnify sdk loaded");
      });
    document.body.appendChild(script);
  }, []);

  return (
    <section className="grid place-items-center h-screen">
      <form className="w-4/5 max-w-3xl">
        <Card className="p-8">
          <h2 className="text-center capitalize sm:text-2xl md:text-3xl">
            login
          </h2>

          <FormRow
            type="email"
            name="email"
            placeholder="your email@gmail.com"
          />
          <FormRow type="number" name="amount" />
          <Button className="capitalize" type="button" onClick={payWithMonify}>
            pay
          </Button>
        </Card>
      </form>
    </section>
  );
};

export default PaymentPage;
