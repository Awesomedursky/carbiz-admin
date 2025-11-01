"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import RiderEntity from "@/types/rider.type";

interface ApproveRiderProps {
  rider: RiderEntity;
}

const ApproveRider = ({ rider }: ApproveRiderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState("");

  const handleApprove = () => {
    console.log("Approved:", rider);
    setNote("");
    setIsOpen(false);
  };

  return (
    <>
      {/* Approve Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        Approve Rider
      </Button>

      {/* Approve Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Approve Rider
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Review and approve this rider request.
            </DialogDescription>
          </DialogHeader>

          {/* Rider Details */}
          <div className="space-y-2 py-2">
            <span className="block font-medium text-gray-800">
              {rider.name}
            </span>
            <span className="block text-sm text-gray-500">
              Rider • ID: {rider.id}
            </span>
          </div>

          {/* Additional Note */}
          <div className="space-y-2 mt-4">
            <label className="text-sm font-medium text-gray-700">
              Additional Note (Optional)
            </label>
            <Textarea
              placeholder="Add any note or special condition for this rider..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Cancel
            </Button>
            <Button
              onClick={handleApprove}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Approve Rider
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApproveRider;
