"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDrawerStore } from "@/store/drawer.store";
import RiderEntity from "@/types/rider.type";

interface DisableRiderProps {
  rider: RiderEntity;
}

const DisableRider: React.FC<DisableRiderProps> = ({ rider }) => {
  const { closeModal } = useDrawerStore();
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDisable = async () => {
    if (!reason.trim()) {
      alert("Please provide a reason for disabling this rider.");
      return;
    }

    setLoading(true);
    try {
      // 🔧 Replace this with your mutation or API call
      console.log(`Disabling rider ${rider.name} (${rider.id})`);
      console.log("Reason:", reason);

      // simulate network delay
      await new Promise((res) => setTimeout(res, 1200));

      closeModal();
    } catch (error) {
      console.error("Error disabling rider:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 w-full max-w-md space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Disable Rider</h2>
        <p className="text-sm text-gray-600">
          Please provide a reason for disabling <strong>{rider.name}</strong>.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason">Reason</Label>
        <Input
          id="reason"
          placeholder="e.g., Rider violated policy..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-2 pt-3">
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleDisable}
          disabled={loading}
        >
          {loading ? "Disabling..." : "Disable Rider"}
        </Button>
      </div>
    </div>
  );
};

export default DisableRider;
