import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import InputField from "@/components/atoms/form/input";

import SelectField from "@/components/atoms/form/select";
import PaymentSchema, { PaymentSchemaType } from "@/schema/payment.schema";

const PaymentForm = () => {
  const form = useForm<PaymentSchemaType>({
    resolver: zodResolver(PaymentSchema),
  });

  const onSubmit = (data: PaymentSchemaType) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-4 max-w-sm">
          <InputField
            control={form.control}
            name="accountName"
            label="Account Name"
            placeholder="John Doe"
          />
          <InputField
            control={form.control}
            name="accountNumber"
            label="Account Number"
            placeholder="023333398"
          />
          <SelectField
            control={form.control}
            label="Bank Name"
            name="bankName"
            placeholder="Select"
          />
        </div>

        <Button
          type="submit"
          className="bg-primary text-white py-7 rounded-[0.625rem] text-base w-[16%]"
        >
          Edit
        </Button>
      </form>
    </Form>
  );
};

export default PaymentForm;
