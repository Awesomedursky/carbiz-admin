import CustomButton from "@/components/atoms/button/CustomButton";
import SelectField from "@/components/atoms/form/select";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import {
  useAssignOrdertoRider,
  useFetchAllAvailableRiders,
} from "@/queries/riders.query";
import AssignRiderSchema, {
  AssignRiderSchemaType,
} from "@/schema/assignRiderSchema";
import { useDrawerStore } from "@/store/drawer.store";
import RiderEntity from "@/types/rider.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const AssignAvailaRider = ({ orderID }: { orderID: string }) => {
  const { closeModal } = useDrawerStore();
  const { data, loading } = useFetchAllAvailableRiders();
  const { assignOrdertoRider, assignRiderLoading } =
    useAssignOrdertoRider(orderID);

  const form = useForm<AssignRiderSchemaType>({
    resolver: zodResolver(AssignRiderSchema),
  });

  const options = data?.map((i: RiderEntity) => ({
    label: `${i?.firstName}- ${i?.lastName}`,
    value: i?.riderID,
  }));

  if (loading) {
    return (
      <div className=" flex items-center justify-center w-full flex-1 h-[150px]">
        <Spinner className="text-primary size-12" />
      </div>
    );
  }

  const handleSubmit = async (e: AssignRiderSchemaType) => {
    await assignOrdertoRider({
      variables: { orderID: orderID, riderID: e?.riderID },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <SelectField
          name="riderID"
          label="Rider"
          placeholder="Select Rider"
          control={form.control}
          items={options}
        />
        <div className="flex space-x-2 mt-2">
          <CustomButton variant="outline" onClick={closeModal}>
            Cancel
          </CustomButton>
          <CustomButton loading={assignRiderLoading}>Assign</CustomButton>
        </div>
      </form>
    </Form>
  );
};

export default AssignAvailaRider;
