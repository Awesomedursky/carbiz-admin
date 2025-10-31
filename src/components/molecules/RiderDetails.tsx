"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RiderEntity from "@/types/rider.type";
import { useDrawerStore } from "@/store/drawer.store";

interface RiderDetailsProps {
  rider: RiderEntity;
}

const RiderDetails: React.FC<RiderDetailsProps> = ({ rider }) => {
  const { closeModal } = useDrawerStore();

  return (
    <div className="max-h-[80vh] overflow-y-auto p-2 space-y-6">
      <Card className="shadow-none border-none">
        <CardHeader>
          <h2 className="text-lg font-semibold">Personal Details</h2>
        </CardHeader>

        <Separator className="my-3" />

        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Rider ID</span>
            <span className="font-medium">{rider.riderID || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Rider Name</span>
            <span className="font-medium">{rider.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Rider Email</span>
            <span className="font-medium">{rider.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Rider Phone Number</span>
            <span className="font-medium">{rider.phoneNumber}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Rider Bank Name</span>
            <span className="font-medium">{(rider as any).bankName || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Rider Account Name</span>
            <span className="font-medium">{(rider as any).accountName || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Rider Account Number</span>
            <span className="font-medium">{(rider as any).accountNumber || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
          
            <span
              className="font-medium"
            >
              {rider.status}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* National Identity Section */}
      <Card className="shadow-none border-none">
        <CardHeader>
          <h2 className="text-sm font-bold">
            National Identity / BVN Number
          </h2>
        </CardHeader>
      
        <CardContent>
          <div className="flex  bg-gray-100 rounded-sm p-2 justify-between">
            <span className="text-gray-500">Identity Number</span>
            <span className="font-medium">{(rider as any).identityNumber || "N/A"}</span>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Type Section */}
      <Card className="shadow-none border-none">
        <CardHeader>
          <h2 className="text-sm font-semibold">Vehicle Type</h2>
        </CardHeader>
       
        <CardContent>
          <div className="flex  bg-gray-100 rounded-sm p-2 justify-between">
            <span className=" text-gray-500">Type</span>
            <span className="font-medium">{(rider as any).vehicleType || "N/A"}</span>
          </div>
        </CardContent>
      </Card>

      {/* Documents Section */}
      <Card className="shadow-none border-none">
        <CardHeader>
          <h2 className="text-sm font-semibold">Documents</h2>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Rider Image</span>
            {(rider as any).riderImageUrl ? (
              <a
                href={(rider as any).riderImageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Preview
              </a>
            ) : (
              <span className="text-gray-400 text-sm">No file</span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-700">Driver’s License</span>
            {(rider as any).driverLicenseUrl ? (
              <a
                href={(rider as any).driverLicenseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Preview
              </a>
            ) : (
              <span className="text-gray-400 text-sm">No file</span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-700">Vehicle Document</span>
            {(rider as any).vehicleDocumentUrl ? (
              <a
                href={(rider as any).vehicleDocumentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Preview
              </a>
            ) : (
              <span className="text-gray-400 text-sm">No file</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Footer Buttons */}
      <div className="flex justify-between gap-3 pt-4 sticky bottom-0 left-0 right-0 px-6 pb-4 ">
        <Button variant="outline" onClick={closeModal}>
          Reject Rider
        </Button>
        <Button variant="default" className="bg-purple-600 hover:bg-purple-700">
          Approve Rider
        </Button>
      </div>
    </div>
  );
};

export default RiderDetails;
