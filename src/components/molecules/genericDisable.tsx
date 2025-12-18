import { useDrawerStore } from "@/store/drawer.store";

import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import DetailsSection from "./order/DetailsSection";
import moment from "moment";
import CustomButton from "../atoms/button/CustomButton";
import { useRiderApproveDisapprove } from "@/queries/riders.query";
import { useVerifyMerchant } from "@/queries/merchants";
import { useDeleteAdmin } from "@/queries/admin.query";
import { useDeleteoneNotificationCenter } from "@/queries/notifications.query";
import { useDeleteProductCategory } from "@/queries/product-categories.query";

const GenericDisable = ({
  id,
  name,
  created,
  type,
  state,
}: {
  id: string;
  name: string;
  created: string;
  type: "approve" | "reject" | "delete";
  state?: "rider" | "admin" | "merchant" | "notification" | "product-category";
}) => {
  const { title, closeModal } = useDrawerStore();

  const { approveDisapproveRider, loading } = useRiderApproveDisapprove(id);
  const { approveDisApproveMerchant, merchantLoading } = useVerifyMerchant(id);
  const { deleteAdmin, loading: adminLoading } = useDeleteAdmin();
  const { deleteNotification, deleteNotificationLoading } =
    useDeleteoneNotificationCenter();
  const { deleteProductCategory, loadingDelProductCategory } =
    useDeleteProductCategory();

  const approveFunction = () => {
    switch (state) {
      case "rider":
        approveDisapproveRider({
          variables: {
            approve: { approve: type === "approve" ? true : false },
            riderID: id,
          },
        });
        break;
      case "merchant":
        approveDisApproveMerchant({
          variables: {
            approve: { approve: type === "approve" ? true : false },
            merchantID: id,
          },
        });
        break;
      case "admin":
        deleteAdmin({ variables: { adminID: id } });
        break;

      case "notification":
        deleteNotification({ variables: { notificationID: id } });
        break;

      case "product-category":
        deleteProductCategory({ variables: { productCategoryID: id } });
        break;

      default:
        return null;
    }
  };

  if (type === "approve") {
    return (
      <div className="p-5 w-full  space-y-6">
        {/* ---- Header ---- */}
        <div className="flex items-center flex-col  w-full">
          <h2 className="text-lg md:text-xl font-bold text-center">
            Approve {title} Account
          </h2>
          <p className="text-base">Review and approve this {title} request.</p>
        </div>

        {/* ---- Info ---- */}
        <div className="space-y-3">
          <div className=" bg-[#FBFBFB] border-[#ECECEB] border rounded-xl p-3 ">
            <p className="font-semibold text-base">{name}</p>
            <p className="text-sm text-gray-500">
              {title} • ID: {id}
            </p>
          </div>
        </div>

        {/* ---- Buttons ---- */}
        <div className="grid grid-cols-2 space-x-2.5">
          <Button variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <CustomButton
            loading={loading || merchantLoading}
            onClick={approveFunction}
          >
            Approve {title}
          </CustomButton>
        </div>
      </div>
    );
  }

  if (type === "reject") {
    return (
      <div className="p-5 w-full  space-y-6">
        {/* ---- Header ---- */}
        <div className="flex items-center flex-col  w-full">
          <h2 className="text-lg md:text-xl font-bold text-center">
            Account Reject {title} Request
          </h2>
          <p className="text-base">
            This action will permanently reject this {title} request.
          </p>
        </div>

        {/* ---- Info ---- */}
        <div className="space-y-3">
          <div className=" bg-[#FBFBFB] border-[#ECECEB] border rounded-xl p-3 ">
            <p className="font-semibold text-base">{name}</p>
            <p className="text-sm text-gray-500">
              {title} • ID: {id}
            </p>
          </div>
        </div>

        {/* ---- Buttons ---- */}
        <div className="grid grid-cols-2 space-x-2.5">
          <Button variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <CustomButton
            variant={"destructive"}
            onClick={approveFunction}
            loading={loading || merchantLoading}
          >
            Reject {title}
          </CustomButton>
        </div>
      </div>
    );
  }

  if (type === "delete") {
    return (
      <div className="p-5 w-full  space-y-6">
        {/* ---- Header ---- */}
        <div className="flex items-center flex-col  w-full">
          <h2 className="text-lg md:text-xl font-bold text-center">
            Delete {title}
          </h2>
          <p className="text-base">
            This action will permanently delete this {title}.
          </p>
        </div>

        {/* ---- Info ---- */}
        <div className="space-y-3">
          <div className=" bg-[#FBFBFB] border-[#ECECEB] border rounded-xl p-3 ">
            <p className="font-semibold text-base">{name}</p>
            <p className="text-sm text-gray-500">
              {title} • ID: {id}
            </p>
          </div>
        </div>

        {/* ---- Buttons ---- */}
        <div className="grid grid-cols-2 space-x-2.5">
          <Button variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <CustomButton
            variant={"destructive"}
            onClick={approveFunction}
            loading={
              adminLoading ||
              deleteNotificationLoading ||
              loadingDelProductCategory
            }
          >
            Delete {title}
          </CustomButton>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 w-full  space-y-6">
      {/* ---- Header ---- */}
      <div className="flex items-center flex-col  w-full">
        <h2 className="text-lg md:text-xl font-bold text-center">
          Disable {title} Account
        </h2>
        <p className="text-base">
          Restrict {title} access and halt all operations.
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

        <DetailsSection
          //   title="Test"
          details={{
            "Member Since": moment(created).format("MMMM, DD YYYY HH:mm"),
          }}
        />

        {/* ---- Disable Options ---- */}
        <div className="space-y-1 grid grid-cols-1">
          <Label>Disable Options</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select one" />
            </SelectTrigger>
            <SelectContent className=" text-wrap w-[var(--radix-select-trigger-width)] text-sm overflow-hidden">
              <SelectItem value="temporary">
                Temporary Suspension - (Rider can be reactivated later.
                Availability but active Deliveries continue).
              </SelectItem>
              <SelectItem value="permanent">
                Permanent Disable - (Complete account closure. All active
                deliveries cancelled, requires manual reactivation).
              </SelectItem>
              <SelectItem value="delivery access">
                Delivery Access Only - (Hide from new order assignments but
                allow dashboard access and existing delivery management).
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ---- Reason Field ---- */}
        <div className="space-y-2">
          <Label>
            Reason for Disabling{" "}
            <span className="text-red-500">(Required)</span>
          </Label>
          <Textarea
            placeholder="Please provide a detailed reason for disabling this rider..."
            //   value={reason}
            //   onChange={(e) => setReason(e.target.value)}
            className="min-h-[50px]"
          />
        </div>
      </div>

      {/* ---- Buttons ---- */}
      <div className="grid grid-cols-2 space-x-2.5">
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          //   onClick={handleDisable}
          //   disabled={loading}
        >
          {/* {loading ? "Disabling..." : "Disable Rider"} */}
          Disable {title}
        </Button>
      </div>
    </div>
  );
};

export default GenericDisable;
