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

const GenericDisable = ({ disable, disableType }) => {
  const { title, closeModal } = useDrawerStore();
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
          <p className="font-semibold text-base">Name</p>
          <p className="text-sm text-gray-500">{title} • ID: #12345</p>
        </div>

        <DetailsSection
          //   title="Test"
          details={{
            "Member Since": "January 12 2025",
            "Last Active": "2 hours ago",
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
