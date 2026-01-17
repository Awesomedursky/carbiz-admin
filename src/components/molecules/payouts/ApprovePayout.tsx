import CustomButton from "@/components/atoms/button/CustomButton";
import TextArea from "@/components/atoms/form/textarea";
import { Form } from "@/components/ui/form";
import { useDrawerStore } from "@/store/drawer.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SelectField from "@/components/atoms/form/select";
import ImagePicker from "@/components/atoms/form/imagepicker";
import { approvePayout, initiatePayoutType } from "@/queries/payouts.query";

const initiatePayoutSchema = z.object({
  paymentMethod: z
    .string({ message: "payment methos is required" })
    .min(1, "payment method is required"),
  paymentNote: z.string().optional(),
  payoutId: z.string().optional(),
  // transactionReference: z.string({
  //   message: "Transaction reference is required",
  // }),
  transactionReference: z.string().optional(),
});

const ApprovePayout = ({
  title,
  payoutId,
  name,
  id,
  requestID,
  bank,
  amount,
}: {
  title: string;
  payoutId: string;
  name: string;
  id: string;
  requestID: string;
  bank: string;
  amount: number;
}) => {
  const { closeModal } = useDrawerStore();
  const form = useForm<initiatePayoutType>({
    resolver: zodResolver(initiatePayoutSchema),
  });

  const { initiatePayout, initiatePayoutLoading } = approvePayout(payoutId);

  const onSubmit = async (data: initiatePayoutType) => {
    initiatePayout({
      variables: {
        input: { ...data, payoutId },
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="p-5 w-full  space-y-2.5">
          {/* ---- Header ---- */}
          <div className="flex items-center flex-col  w-full">
            <h2 className="text-lg md:text-xl font-bold text-center">
              Iniate Payout
            </h2>
            <p className="text-base">
              Confirm manual payment and upload proof of payment.
            </p>
          </div>

          <div className="space-y-2">
            <div className=" bg-[#FBFBFB] border-[#ECECEB] border rounded-xl p-3 ">
              <p className="font-semibold text-base">{name}</p>
              <p className="text-sm text-gray-500">
                {title} • ID: {id}
              </p>
            </div>

            <div className=" bg-[#FBFBFB] border-[#ECECEB] border rounded-xl p-3 space-y-2">
              <p className=" text-base justify-between flex items-center border-b pb-2">
                Request ID <span className=" font-bold">{requestID}</span>
              </p>
              <p className=" text-base justify-between flex items-center border-b pb-2">
                Bank Account <span className=" font-bold">{bank}</span>
              </p>
              <p className="font-semibold text-base justify-between flex items-center">
                Payout Amount
                <span className=" font-bold text-green-500">₦{amount}</span>
              </p>
            </div>
          </div>

          <SelectField
            name="paymentMethod"
            label="Payment Method"
            control={form.control}
            items={[
              { label: "Bank Transfer", value: "Bank_Transfer" },
              { label: "Paystack", value: "Paystack" },
            ]}
            placeholder="select payment method"
          />

          <TextArea
            name="paymentNote"
            placeholder="add any additional note about payment"
            control={form.control}
            label="Payment Notes"
          />

          <ImagePicker
            name="transactionReference"
            control={form.control}
            label="Upload payment receipt"
          />

          {/* ---- Buttons ---- */}
          <div className="grid grid-cols-2 space-x-2.5">
            <CustomButton variant="outline" onClick={closeModal}>
              Cancel
            </CustomButton>
            <CustomButton
              disabled={initiatePayoutLoading}
              loading={initiatePayoutLoading}
            >
              Initiate Payout
            </CustomButton>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ApprovePayout;
