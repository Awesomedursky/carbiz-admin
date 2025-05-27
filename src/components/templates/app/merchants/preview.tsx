import React from "react";
import { useFetchOneMerchant, useVerifyMerchant } from "@/queries/merchants";
import { Link, useParams } from "react-router";
import { CardDetail } from "@/components/atoms/card/previewCard";
import moment from "moment";
import { ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import DocumentPreview from "@/components/atoms/documentpreview";
import InputField from "@/components/atoms/form/input";

type MerchantData = {
  businessName: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
  status: string;
};

const fields: (keyof MerchantData)[] = [
  "businessName",
  "email",
  "phoneNumber",
  "createdAt",
  "status",
];

const formatKey = (key: string) =>
  key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

const PreviewMerchant = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading } = useFetchOneMerchant(id ? id : "");
  const { mutate, loading: mutationLoading } = useVerifyMerchant();

  // console.log(data);

  if (loading) {
    return (
      <div className="flex bg-white min-h-full justify-center items-center p-5">
        {loading && "Fetching data..."}
      </div>
    );
  }

  const onApproveMerchant = (verified: boolean) => {
    if (!verified) {
      // approve Merchant
      mutate({
        variables: {
          approve: !verified || false,
          merchantID: data?.merchantID || "",
        },
      });
      return;
    }

    //  disapprove Merchant
  };

  const onDeactiveMerchant = () => {};

  return (
    <div className="space-y-10">
      <Link to={".."} className="inline-flex items-center gap-2.5">
        <ArrowLeft size={20} color="#696572" />
        <h4 className="font-family-satoshi text-text-secondary text-base font-medium">
          Merchant Details
        </h4>
      </Link>
      <div className="bg-white py-10 px-6 rounded-md space-y-10">
        <div className="flex gap-4 ">
          <CardDetail
            title="Business Name"
            value={data?.businessName ? data.businessName : ""}
          />
          <CardDetail title="email" value={data?.email ? data.email : ""} />
          <CardDetail
            title="Phone Number"
            value={data?.phoneNumber ? data.phoneNumber : ""}
          />
          <CardDetail
            title="Added on"
            value={
              data?.createdAt ? moment(data.createdAt).format("DD-MM-YYYY") : ""
            }
          />
          <CardDetail
            isLast
            title="Status"
            value={data?.isVerified ? data.isVerified : ""}
          />
        </div>

        {data?.isVerified && (
          <div>
            <h4 className="text-lg font-semibold">Products</h4>
            <Link
              className="text-primary text-base font-medium inline-flex gap-2 items-center"
              to={`./products`}
            >
              View Products
              <ArrowRight className="size-4" />
            </Link>
          </div>
        )}

        <div className="">
          <h4 className="text-lg font-semibold">Documents</h4>

          <div className="grid grid-cols-3 gap-5 max-w-xl mt-4">
            {data?.businessLicense && (
              <DocumentPreview
                label="Business license"
                url={data.businessLicense}
              />
            )}
            {data?.CAC && (
              <DocumentPreview label="CAC" url={data.CAC} />
            )}
            {data?.validIDcard && (
              <DocumentPreview
                label="Identification Card"
                url={data.validIDcard}
              />
            )}
            {data?.taxID && (
              <div className="w-full col-span-2 space-y-2">
                <h4 className="text-sm font-medium">
                  Tax Identification Number
                </h4>
                <p className="p-4 border border-[#F3F2F4] rounded-md w-full">
                  {data?.taxID}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="inline-flex items-center space-x-5">
          <Button
            size="lg"
            className={`${
              data?.isVerified
                ? "bg-red-50 text-red-700 hover:bg-red-100"
                : "bg-primary text-white"
            } text-sm`}
            onClick={() => onApproveMerchant(data?.isVerified || false)}
          >
            {data?.isVerified ? "Remove" : "Approve"}
          </Button>
          <Button
            size="lg"
            className={`text-sm bg-gray-100 text-gray-600 hover:bg-gray-50`}
          >
            {data?.isVerified ? "Deactivate" : "Reject"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreviewMerchant;
