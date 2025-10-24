import React from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import RiderEntity from "@/types/rider.type";

const RiderDetails: React.FC<{ rider: RiderEntity }> = ({ rider }) => {
  return (
    <Card className="shadow-none border-none">
      <CardHeader>
        <h2 className="text-lg font-semibold">Personal Details</h2>
        
      </CardHeader>

      <Separator className="my-3" />

      <CardContent className="space-y-3 text-sm">

        <div className="flex justify-between">
          <span className="text-gray-500">RIDER ID</span>
          <span className="font-medium">{rider.riderID}</span>
        </div>

         <div className="flex justify-between">
          <span className="text-gray-500">RIDER NAME</span>
          <span className="font-medium">{rider.name}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Rider Email</span>
          <span className="font-medium">{rider.email}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Phone Number</span>
          <span className="font-medium">{rider.phoneNumber}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Status</span>
          <span className="font-medium">{rider.status}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Updated At</span>
          <span className="font-medium">
            {new Date(rider.updatedAt).toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiderDetails;
