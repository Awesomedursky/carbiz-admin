import CustomButton from "@/components/atoms/button/CustomButton";
import TextArea from "@/components/atoms/form/textarea";
import { Form } from "@/components/ui/form";
import { useDrawerStore } from "@/store/drawer.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cancelPayout } from "@/queries/payouts.query";

const ReasonSchema = z.object({
  reason: z.string({ message: "Reason is required" }),
});

const CancelPayout = ({
  title,
  name,
  id,
  requestID,
  amount,
  payoutId,
}: {
  title: string;
  name: string;
  id: string;
  requestID: string;
  amount: number;
  payoutId: string;
}) => {
  const { closeModal } = useDrawerStore();
  const form = useForm<{ reason: string }>({
    resolver: zodResolver(ReasonSchema),
  });

  const { cancelPayoutLoading, cancelPayoutMutation } = cancelPayout(payoutId);

  const onSubmit = async (data: { reason: string }) => {
    cancelPayoutMutation({
      variables: {
        input: {
          payoutId,
          ...data,
        },
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <div className="p-5 w-full  space-y-6">
          {/* ---- Header ---- */}
          <div className="flex items-center flex-col  w-full">
            <h2 className="text-lg md:text-xl font-bold text-center">
              Cancel Payout Request
            </h2>
            <p className="text-base">
              This action will permanently cancel this payout request.
            </p>
          </div>

          {/* ---- Rider Info ---- */}
          <div className="space-y-3">
            <div className=" bg-[#FBFBFB] border-[#ECECEB] border rounded-xl p-3 ">
              <p className="font-semibold text-base">{name}</p>
              <p className="text-sm text-gray-500">
                {title} • ID: {id}
              </p>
            </div>

            <div className=" bg-[#FBFBFB] border-[#ECECEB] border rounded-xl p-3 ">
              <p className=" text-base justify-between flex items-center border-b pb-2 mb-2">
                Request ID <span className=" font-bold">{requestID}</span>
              </p>
              <p className="font-semibold text-base justify-between flex items-center">
                Payout Amount
                <span className=" font-bold text-red-500">₦{amount}</span>
              </p>
            </div>
          </div>

          <TextArea
            name="reason"
            placeholder="please provide a detailed reason for cancelling this payout request..."
            control={form.control}
            label="Cancellation Reason"
          />

          {/* ---- Buttons ---- */}
          <div className="grid grid-cols-2 space-x-2.5">
            <CustomButton variant="outline" onClick={closeModal}>
              Cancel
            </CustomButton>
            <CustomButton
              variant="destructive"
              disabled={cancelPayoutLoading}
              loading={cancelPayoutLoading}
            >
              Disable Payout
            </CustomButton>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CancelPayout;
