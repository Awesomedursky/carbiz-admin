import CustomButton from "@/components/atoms/button/CustomButton";
import InputField from "@/components/atoms/form/input";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface type {
  price: number;
}

const schema = z.object({
  price: z.number({ message: "input digits only" }),
});

const Pricing = () => {
  const form = useForm<type>({
    resolver: zodResolver(schema),
  });

  return (
    <div className=" p-6 rounded-2xl border shadow-2xl">
      <h2 className=" text-lg font-semibold">Product Price</h2>
      <Form {...form}>
        <form>
          <div className=" max-w-sm">
            <InputField
              name="price"
              label="Current Price"
              control={form.control}
            />
          </div>
          <CustomButton type="submit">Update Price</CustomButton>
        </form>
      </Form>
    </div>
  );
};

export default Pricing;
