import { useState } from "react";
import { useFetchOneMerchant, useVerifyMerchant } from "@/queries/merchants";
import { Link, useParams } from "react-router";
import { CardDetail } from "@/components/atoms/card/previewCard";
import moment from "moment";
import { ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import DocumentPreview from "@/components/atoms/documentpreview";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const PreviewMerchant = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, refetch } = useFetchOneMerchant(id || "");
  const { mutate, loading: mutationLoading } = useVerifyMerchant();
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const onApproveMerchant = (verified: boolean) => {
    mutate({
      variables: {
        approve: { approve: verified },
        merchantID: data?.merchantID || "",
      },
    });
    refetch();
  };

  console.log(data?.isVerified);

  if (loading) {
    return (
      <div className="flex bg-white min-h-full justify-center items-center p-5">
        Fetching data...
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <Link to={".."} className="inline-flex items-center gap-2.5">
        <ArrowLeft size={20} color="#696572" />
        <h4 className="text-text-secondary text-base font-medium">
          Merchant Details
        </h4>
      </Link>

      <div className="bg-white py-10 px-6 rounded-md space-y-10">
        <div className="flex gap-4 md:gap-6 flex-wrap">
          <CardDetail title="Business Name" value={data?.businessName || ""} />
          <CardDetail title="Email" value={data?.email || ""} />
          <CardDetail title="Phone Number" value={data?.phoneNumber || ""} />
          <CardDetail
            title="Added on"
            value={
              data?.createdAt ? moment(data.createdAt).format("DD-MM-YYYY") : ""
            }
          />
          <CardDetail isLast title="Status" value={data?.isVerified} />
        </div>

        {data?.isVerified && (
          <div>
            <h4 className="text-lg font-semibold">Products</h4>
            <Link
              to={`./products`}
              className="text-primary text-base font-medium inline-flex gap-2 items-center"
            >
              View Products
              <ArrowRight className="size-4" />
            </Link>
          </div>
        )}

        <div>
          <h4 className="text-lg font-semibold">Documents</h4>
          <div className="grid grid-cols-3 gap-5 max-w-xl mt-4">
            {data?.businessLicense && (
              <DocumentPreview
                label="Business license"
                url={data.businessLicense}
                onView={setSelectedDoc}
              />
            )}
            {data?.CAC && (
              <DocumentPreview
                label="CAC"
                url={data.CAC}
                onView={setSelectedDoc}
              />
            )}
            {data?.validIDcard && (
              <DocumentPreview
                label="Identification Card"
                url={data.validIDcard}
                onView={setSelectedDoc}
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
            disabled={mutationLoading}
            className={`${
              data?.isVerified
                ? "bg-red-50 text-red-700 hover:bg-red-100"
                : "bg-primary text-white"
            } text-sm`}
            onClick={() =>
              onApproveMerchant(data?.isVerified === true ? false : true)
            }
          >
            {mutationLoading
              ? "Loading"
              : data?.isVerified
              ? "Deactivate"
              : "Approve"}
          </Button>
          {data?.isVerified === false && (
            <Button
              size="lg"
              className="text-sm bg-gray-100 text-gray-600 hover:bg-gray-50"
              onClick={() => onApproveMerchant(false)}
            >
              Reject
            </Button>
          )}
        </div>
      </div>

      {/* Document Modal */}
      <Dialog open={!!selectedDoc} onOpenChange={() => setSelectedDoc(null)}>
        <DialogContent className=" p-0">
          {selectedDoc && (
            <img
              src={selectedDoc}
              className="w-full h-[50vh] rounded-xl object-cover"
              title="Document Viewer"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PreviewMerchant;
