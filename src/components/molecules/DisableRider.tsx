"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDrawerStore } from "@/store/drawer.store";
import RiderEntity from "@/types/rider.type";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface DisableRiderProps {
  rider: RiderEntity;
}

const DisableRider: React.FC<DisableRiderProps> = ({ rider }) => {
  const { closeModal } = useDrawerStore();
  const [disableOption, setDisableOption] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDisable = async () => {
    if (!disableOption || !reason.trim()) {
      alert("Please select an option and provide a reason for disabling this rider.");
      return;
    }

    setLoading(true);
    try {
      console.log(`Disabling rider ${rider.name} (${rider.id})`);
      console.log("Option:", disableOption);
      console.log("Reason:", reason);

      // simulate API delay
      await new Promise((res) => setTimeout(res, 1200));

      closeModal();
    } catch (error) {
      console.error("Error disabling rider:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 w-full max-w-md space-y-6 text-gray-800">
      {/* ---- Header ---- */}
      <div className="text-center space-y-1">
        <h2 className="text-lg font-semibold">Disable Rider Account</h2>
        <p className="text-sm text-gray-500">
          Restrict rider access and halt all operations.
        </p>
      </div>

      {/* ---- Rider Info ---- */}
      <div className="border rounded-lg p-4 bg-gray-50 space-y-2">
        <div>
          <p className="font-semibold text-base">{rider.name}</p>
          <p className="text-sm text-gray-500">Rider • ID: #{rider.riderID ?? rider.id}</p>
        </div>

        <div className="text-sm border-t pt-2 space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-600">Member Since</span>
            <span className="font-medium">{}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Last Active</span>
            <span className="font-medium">2 hours ago</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Deliveries</span>
            <span className="font-medium">2,847</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Monthly Revenue</span>
            <span className="font-medium">₦845K</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Ratings</span>
            <span className="font-medium">4.2★</span>
          </div>
        </div>
      </div>

      {/* ---- Disable Options ---- */}
      <div className="space-y-2">
        <Label>Disable Options</Label>
        <Select onValueChange={setDisableOption}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select one" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="temporary">Temporary Suspension - (Rider can be reactivated
              <br/>
              later. Availability but active Deliveries
              continue).</SelectItem>
            <SelectItem value="permanent">Permanent Disable - (Complete account closure. 
              <br/>
              All active deliveries cancelled, requires
              manual reactivation).</SelectItem>
            <SelectItem value="delivery access">Delivery Access Only - (Hide from new order 
              <br/>
              assignments but allow dashboard access and existing delivery management).</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ---- Reason Field ---- */}
      <div className="space-y-2">
        <Label>
          Reason for Disabling <span className="text-red-500">(Required)</span>
        </Label>
        <Textarea
          placeholder="Please provide a detailed reason for disabling this rider..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      {/* ---- Buttons ---- */}
      <div className="flex justify-end gap-2 pt-4">
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
