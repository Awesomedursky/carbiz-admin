import CustomButton from "@/components/atoms/button/CustomButton";
import TextArea from "@/components/atoms/form/textarea";
import { Form } from "@/components/ui/form";
import { useDrawerStore } from "@/store/drawer.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SelectField from "@/components/atoms/form/select";
import ImagePicker from "@/components/atoms/form/imagepicker";
import {
  approveEtxernalPayoutType,
  approveExternalTransfer,
  approvePayout,
  initiatePayoutType,
} from "@/queries/payouts.query";
// import FormOtpInput from "@/components/atoms/form/otpinput";
// import InputField from "@/components/atoms/form/input";

const initiatePayoutSchema = z.object({
  paymentMethod: z
    .string({ message: "payment method is required" })
    .min(1, "payment method is required"),
  payoutId: z.string().optional(),
  transactionReference: z.string().optional(),
});

const approvePayoutSchema = z.object({
  paymentNote: z.string().optional(),
  payoutId: z.string().optional(),
  // transactionReference: z.string({
  //   message: "Transaction reference is required",
  // }),
  paymentReceiptUrl: z
    .string({ message: "Payment receipt is required" })
    .min(1, "Payment receipt is required"),
});

const ApprovePayout = ({
  title,
  type,
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
  type?: string;
}) => {
  const { closeModal } = useDrawerStore();
  const form = useForm<initiatePayoutType>({
    resolver: zodResolver(initiatePayoutSchema),
  });
  const externalApprovalForm = useForm<approveEtxernalPayoutType>({
    resolver: zodResolver(approvePayoutSchema),
  });

  const paymentMethod = form.watch("paymentMethod");

  const { initiatePayout, initiatePayoutLoading } = approvePayout(payoutId);
  const { approveTransfer, approvalLoading } =
    approveExternalTransfer(payoutId);

  const onSubmit = async (data: initiatePayoutType) => {
    initiatePayout({
      variables: {
        input: { ...data, payoutId },
      },
    });
  };

  const onExternalApprovalSubmit = async (data: approveEtxernalPayoutType) => {
    approveTransfer({
      variables: {
        input: { ...data, payoutId },
      },
    });
  };

  if (paymentMethod === "Bank_Transfer" && type) {
    return (
      <Form {...externalApprovalForm}>
        <form
          onSubmit={externalApprovalForm.handleSubmit(onExternalApprovalSubmit)}
        >
          <div className="p-5 w-full  space-y-2.5">
            <div className="flex items-center flex-col  w-full">
              <h2 className="text-lg md:text-xl font-bold text-center">
                Complete {String(paymentMethod).replace("_", " ")} Payout
              </h2>
            </div>

            <ImagePicker
              name="paymentReceiptUrl"
              control={externalApprovalForm.control}
              label="Upload payment receipt"
            />
            <TextArea
              name="paymentNote"
              placeholder="add any additional note about payment"
              control={externalApprovalForm.control}
              label="Payment Notes"
            />

            <div className="grid grid-cols-2 space-x-2.5">
              <CustomButton variant="outline" onClick={closeModal}>
                Cancel
              </CustomButton>
              <CustomButton
                disabled={approvalLoading}
                loading={approvalLoading}
              >
                Confirm Payout
              </CustomButton>
            </div>
          </div>
        </form>
      </Form>
    );
  }

  if (paymentMethod === "Paystack" && type) {
    return (
      <Form {...externalApprovalForm}>
        <form
          onSubmit={externalApprovalForm.handleSubmit(onExternalApprovalSubmit)}
        >
          <div className="p-5 w-full  space-y-2.5">
            <div className="flex items-center flex-col  w-full">
              <h2 className="text-lg md:text-xl font-bold text-center">
                Complete {String(paymentMethod).replace("_", " ")} Payout
              </h2>
            </div>

            {/* <FormOtpInput name="otp" label="OTP" control={} />
            <InputField name="transferCode" label="Transfer Code" /> */}

            <div className="grid grid-cols-2 space-x-2.5">
              <CustomButton variant="outline" onClick={closeModal}>
                Cancel
              </CustomButton>
              <CustomButton
                disabled={approvalLoading}
                loading={approvalLoading}
              >
                Confirm Payout
              </CustomButton>
            </div>
          </div>
        </form>
      </Form>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
