import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import Loader from "@/components/atoms/loader";
import { useFetchProduct } from "@/queries/merchants";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const PreviewPreview = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.split("/").pop();

  const { fetchOneProduct, data, loading } = useFetchProduct();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (path) {
      fetchOneProduct({ variables: { productID: path } });
    }
  }, [path]);

  const {
    productName,
    productCategory,
    priceCurrencyType,
    price,
    productStock,
    productType,
    productWeight,
    productColor,
    productDescription,
    productImages,
  } = data || {};

  return (
    <div className="space-y-10 font-satoshi">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2.5 cursor-pointer"
      >
        <ArrowLeft size={20} color="#696572" />
        <h4 className="text-text-secondary text-base font-medium">
          Product Detail
        </h4>
      </button>

      {loading ? (
        <Loader />
      ) : (
        <div className="flex mt-2 flex-col md:flex-row gap-2 md:gap-4">
          {/* Product Details */}
          <div className="rounded-xl p-3 sm:p-4 md:p-6 w-full md:w-[60%] bg-white flex gap-4 md:gap-5 flex-col">
            <InputBox title="Product Name" value={productName ?? ""} />
            <div className="flex flex-col sm:flex-row gap-4">
              <InputBox
                title="Product Category"
                value={productCategory?.productCategoryName ?? ""}
              />
              <InputBox
                title="Price"
                value={`${priceCurrencyType ?? ""}${price ?? ""}`}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <InputBox title="Quantity" value={productStock ?? ""} />
              <InputBox title="Product Status" value={productType ?? ""} />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <InputBox title="Size" value={productWeight ?? ""} />
              <InputBox title="Colour" value={productColor ?? ""} />
            </div>
            <InputBox title="Description" value={productDescription ?? ""} />
          </div>

          {/* Product Images */}
          <div className="rounded-xl p-2 sm:p-4 md:p-6 w-full md:w-[40%] bg-white flex flex-col gap-2 md:gap-4">
            <h3 className="text-[#1A191C] font-medium text-lg">
              Product Images
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              {productImages?.map((img: string, idx: number) => (
                <img
                  key={idx}
                  src={img}
                  alt={`product-${idx}`}
                  className="rounded-2xl cursor-pointer object-cover aspect-square"
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-3xl p-0">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="preview"
              className="w-full h-full object-contain rounded-xl"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PreviewPreview;

export const InputBox = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => (
  <div className="flex flex-col gap-1 sm:gap-2 md:gap-3 w-full">
    <h3 className="text-[#1A191C] font-medium text-lg">{title}</h3>
    <div className="border border-[#F3F2F4] bg-[#FEFEFE] p-2 sm:p-3 md:p-4 text-[#1A191C] font-medium text-lg rounded-xl">
      {value}
    </div>
  </div>
);
