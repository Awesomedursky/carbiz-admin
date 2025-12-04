import CustomButton from "@/components/atoms/button/CustomButton";
import TextArea from "@/components/atoms/form/textarea";
import { Form } from "@/components/ui/form";
import { useUpdateComplaint } from "@/queries/complaints.query";
import { useDrawerStore } from "@/store/drawer.store";
import { ComplaintOutput } from "@/types/complaints.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

const ResolveSchema = z.object({
  resolutionNotes: z.string().optional(),
  closedComplaintsNote: z.string().optional(),
});
type ResolveSchemaType = z.infer<typeof ResolveSchema>;

const ComplaintResolve = ({
  complaint,
  T,
}: {
  complaint: ComplaintOutput;
  T: "resolve" | "closed";
}) => {
  const { closeModal } = useDrawerStore();
  const form = useForm<ResolveSchemaType>({
    resolver: zodResolver(ResolveSchema),
  });

  const { adminUpdateComplaint, updateComplaintLoading } = useUpdateComplaint();

  const resolveOrCloseComplaint = async (payload: ResolveSchemaType) => {
    if (T === "resolve") {
      await adminUpdateComplaint({
        variables: {
          complaintID: complaint?.complaintID ?? "",
          input: {
            status: "Resolved",
            resolutionNotes: payload.resolutionNotes,
          },
        },
      });
      return;
    }
    await adminUpdateComplaint({
      variables: {
        complaintID: complaint?.complaintID ?? "",
        input: {
          status: "Closed",
          closedComplaintsNote: payload.closedComplaintsNote,
        },
      },
    });
  };

  const { title } = useDrawerStore();
  return (
    <div className="p-2 w-full  space-y-3">
      {/* ---- Header ---- */}
      <div className="flex items-center flex-col  w-full">
        <h2 className="text-lg md:text-xl font-bold text-center">{title}</h2>
        <p className="text-base text-center">
          {T === "resolve"
            ? "Are you sure you want to mark this complaint as resolved? This action will update the complaint status and notify relevant parties"
            : "Are you sure you want to mark this complaint as closed? This action will update the complaint status and notify relevant parties"}
        </p>
      </div>

      <div className=" p-3 bg-gray-100  rounded-2xl space-y-2">
        <h3 className=" text-base font-semibold">{complaint.title}</h3>
        <p>
          <span className="  font-normal">Customer:</span>{" "}
          <span className=" font-semibold ">{complaint?.customer?.name}</span>
        </p>
        <p>
          <span className="  font-normal">Category:</span>{" "}
          <span className=" font-semibold">{complaint?.category}</span>
        </p>
        <p>{complaint?.description}</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(resolveOrCloseComplaint)}
          className="space-y-5"
        >
          <div>
            <TextArea
              label={T === "resolve" ? "Resolution Notes" : "Closing Note"}
              name={
                T === "resolve" ? "resolutionNotes" : "closedComplaintsNote"
              }
              control={form.control}
            />
            <small className=" text-xs ">
              These notes will be saved with the complaint resolution and can be
              referenced later.
            </small>
          </div>

          <div className="grid grid-cols-2 gap-2 w-full">
            <CustomButton
              type="button"
              variant={"outline"}
              size={"lg"}
              onClick={closeModal}
            >
              Cancel
            </CustomButton>
            <CustomButton
              loading={updateComplaintLoading}
              type="submit"
              size={"lg"}
            >
              {T === "resolve" ? "Resolve" : "Close Complaint"}
            </CustomButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ComplaintResolve;
