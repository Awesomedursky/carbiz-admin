import { Skeleton } from "@/components/ui/skeleton";
import DetailsSection from "../order/DetailsSection";
import { BoxIcon } from "lucide-react";
import { useFetchOneMerchant } from "@/queries/merchants";
import { Button } from "@/components/ui/button";
import ProductEntity from "@/types/product.type";
import { useDrawerStore } from "@/store/drawer.store";
import { newHandleApprove, newHandleRejectModal } from "./MerchantActions";
import Merchant from "@/types/merchants.type";
import GenericDisable from "../genericDisable";

const MerchantDetails = ({ merchant }: { merchant: Merchant }) => {
  const { data, loading } = useFetchOneMerchant(merchant?.merchantID || "");
  const { openModal } = useDrawerStore();

  const disableMerchant = () => {
    openModal({
      title: "Merchant",
      content: GenericDisable,
      type: "dialog",
      props: {
        id: merchant?.merchantID,
        name: merchant?.businessName,
        created: merchant?.createdAt,
        state: "merchant",
      },
      placement: "center",
    });
  };

  const handleApprove = () => {
    newHandleApprove(openModal, merchant);
  };

  const handleRejectModal = () => {
    newHandleRejectModal(openModal, merchant);
  };

  const filteredData = Object.fromEntries(
    Object.entries(data ?? {}).filter(
      ([key, value]) =>
        !["businesslicense", "valididcard", "cac", "taxid"].includes(
          key.toLowerCase()
        ) &&
        !Array.isArray(value) &&
        key !== "__typename"
    )
  ) as Record<string, unknown>;

  const taxid = Object.fromEntries(
    Object.entries(data ?? {}).filter(([key]) =>
      ["taxid"].includes(key.toLowerCase())
    )
  ) as Record<string, unknown>;

  const documents = Object.fromEntries(
    Object.entries(data ?? {}).filter(
      ([key, value]) =>
        ["businesslicense", "valididcard", "cac"].includes(key.toLowerCase()) &&
        !Array.isArray(value) &&
        key !== "__typename"
    )
  ) as Record<string, unknown>;

  const my_products = (data as any)?.my_products;
  const status = data?.isApproved;

  //   const navigate = (e: string) => {
  //     closeModal();
  //     nav(`/orders/${e}`);
  //   };

  if (loading) {
    return (
      <div className="grid w-full p-2.5 md:p-3.5 grid-cols-1 space-y-1.5 h-full">
        {Array.from({ length: 2 }).map((_, p) => (
          <Skeleton key={p} className=" h-30" />
        ))}
      </div>
    );
  }

  const buttonRender = () => {
    if (status == false) {
      return (
        <div className="grid grid-cols-2 gap-2">
          <Button variant={"outline"} onClick={() => handleRejectModal()}>
            Reject Merchant
          </Button>
          <Button className="" onClick={() => handleApprove()}>
            Approve Merchant
          </Button>
        </div>
      );
    }
    return (
      <div className="flex place-self-end" onClick={disableMerchant}>
        <Button variant={"destructive"}>Disable Merchant</Button>
      </div>
    );
  };

  return (
    <div className=" p-2.5 md:p-3.5">
      <DetailsSection title="Personal Details" details={filteredData} />
      <DetailsSection title="Tax Identification Number" details={taxid} />
      <DetailsSection title="Documents" details={documents} />

      <div className="bg-white rounded-lg border border-gray-200 mb-4 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 p-2.5">
          My Products
        </h3>

        {my_products?.map((i: ProductEntity, idx: number) => (
          <div key={idx} className="grid grid-cols-1 space-y-1.5 p-3">
            <div className="p-2 border rounded-lg justify-between flex items-center">
              <p className="font-bold text-sm flex items-center space-x-1.5">
                <BoxIcon className="p-2 border rounded-lg size-10" />
                <span className="font-bold text-sm uppercase">
                  {i?.productID} -{" "}
                  <span className=" text-primary">{i?.productName}</span>
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2">{buttonRender()}</div>
    </div>
  );
};

export default MerchantDetails;
