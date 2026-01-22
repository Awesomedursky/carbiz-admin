import CustomButton from "@/components/atoms/button/CustomButton";
import TextArea from "@/components/atoms/form/textarea";
import { Form } from "@/components/ui/form";
import { useDrawerStore } from "@/store/drawer.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ImagePicker from "@/components/atoms/form/imagepicker";
import {
  initiateCustomerPayout,
  useUpdateComplaint,
} from "@/queries/complaints.query";
import { ComplaintOutput } from "@/types/complaints.type";
import InputField from "@/components/atoms/form/input";

const initiatePayoutSchema = z.object({
  amount: z.coerce.number({ message: "Amount is required" }),
  customerId: z.string().optional(),
  orderIDs: z.array(z.string()).optional(),
  paymentMethod: z.string().optional(),
  paymentNote: z.string({ message: "payment note is required" }),
  paymentProof: z.string({ message: "Payment proof is required" }),
  transactionReference: z.string({
    message: "Transaction Reference is required",
  }),
});
export type initiatePayoutType = z.infer<typeof initiatePayoutSchema>;

const InitiatePayout = ({ complaint }: { complaint: ComplaintOutput }) => {
  const { closeModal } = useDrawerStore();
  const form = useForm<initiatePayoutType>({
    resolver: zodResolver(initiatePayoutSchema),
  });

  const { adminUpdateComplaint } = useUpdateComplaint();
  const { adminInitiatPayout, loading } = initiateCustomerPayout();

  const onSubmit = async (data: initiatePayoutType) => {
    console.log({
      ...data,
      paymentMethod: "Bank_Transfer",
      customerId: complaint?.customer?.customerID,
      orderIDs: [complaint?.orderID],
    });

    adminInitiatPayout({
      variables: {
        input: {
          ...data,
          paymentMethod: "Bank_Transfer",
          customerId: complaint?.customer?.customerID,
          orderIDs: [complaint?.orderID],
        },
      },
    });

    adminUpdateComplaint({
      variables: {
        complaintID: complaint?.complaintID ?? "",
        input: { status: "Resolved" },
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className=" w-full  space-y-4">
          {/* ---- Header ---- */}
          <div className="flex items-center flex-col  w-full">
            <h2 className="text-lg md:text-xl font-bold text-center">
              Iniate Customer Payout
            </h2>
            <p className="text-base">
              Confirm manual payment and upload proof of payment.
            </p>
          </div>

          <div className="space-y-2">
            <div className=" bg-[#FBFBFB] border-[#ECECEB] border rounded-xl p-3 ">
              <p className="font-semibold text-base">
                {complaint?.customer?.name}
              </p>
              <p className="text-sm text-gray-500">
                Customer • ID: {complaint?.customer?.customerID}
              </p>
            </div>

            <div className=" bg-[#FBFBFB] border-[#ECECEB] border rounded-xl p-3 space-y-2">
              <p className=" text-base justify-between flex items-center border-b pb-2">
                Order ID{" "}
                <span className=" font-bold">{complaint?.orderID}</span>
              </p>
              <p className=" text-base justify-between flex items-center ">
                Bank Account <span className=" font-bold">{}</span>
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <InputField
              placeholder="Enter Payout Amount"
              name="amount"
              label="Payout Amount"
              control={form.control}
              type="number"
            />
            {/* <SelectField
              name="paymentMethod"
              label="Payment Method"
              control={form.control}
              items={[
                { label: "Bank Transfer", value: "Bank_Transfer" },
                { label: "Paystack", value: "Paystack" },
              ]}
              placeholder="select payment method"
            /> */}
            <TextArea
              name="paymentNote"
              placeholder="add any additional note about payment"
              control={form.control}
              label="Payment Notes"
            />

            <div className=" grid grid-cols-2 gap-4">
              <ImagePicker
                sm
                name="paymentProof"
                control={form.control}
                label="Upload payment proof"
              />
              <ImagePicker
                sm
                name="transactionReference"
                control={form.control}
                label="Upload payment receipt"
              />
            </div>
          </div>

          {/* ---- Buttons ---- */}
          <div className="grid grid-cols-2 space-x-2.5">
            <CustomButton variant="outline" onClick={closeModal} size={"lg"}>
              Cancel
            </CustomButton>
            <CustomButton
              type="submit"
              disabled={loading}
              loading={loading}
              size={"lg"}
            >
              Initiate Payout
            </CustomButton>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default InitiatePayout;
