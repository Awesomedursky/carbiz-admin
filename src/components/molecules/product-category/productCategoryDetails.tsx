import { Skeleton } from "@/components/ui/skeleton";
import { useFetchOneProductCategory } from "@/queries/product-categories.query";
import DetailsSection from "../order/DetailsSection";
import React from "react";

import { useState } from "react";

export const ProductCategoryDetails = ({ id }: { id: string }) => {
  const { loading, data } = useFetchOneProductCategory({
    productCategoryID: id,
    skip: false,
  });

  const [zoomSrc, setZoomSrc] = useState<string | null>(null);

  const details = Object.fromEntries(
    Object.entries(data ?? {}).filter(
      ([key, value]) => !Array.isArray(value) && key !== "__typename"
    )
  ) as Record<string, unknown>;

  const products = data?.products;

  if (loading) {
    return (
      <div className="grid w-full p-2.5 md:p-3.5 grid-cols-1 space-y-1.5 h-full">
        {Array.from({ length: 2 }).map((_, p) => (
          <Skeleton key={p} className="h-30" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-2.5 md:p-3.5 space-y-2.5">
      <DetailsSection title="Details" details={details} />

      <div className="bg-white rounded-lg border border-[#F1ECF9] mb-4 shadow-sm p-2.5 space-y-1.5">
        <h2 className="text-lg font-semibold text-gray-900">Products</h2>

        <div className="space-y-2.5">
          {products?.map((i) => (
            <div
              key={i.productName}
              className="border p-2.5 rounded-lg flex items-center space-x-2.5"
            >
              <h3 className="text-base font-medium capitalize">
                {i?.productName}
              </h3>

              {i?.productImages?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt=""
                  className="size-14 rounded-2xl cursor-pointer hover:scale-105 transition"
                  onClick={() => setZoomSrc(img)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Zoom Popup */}
      <ImageZoomModal src={zoomSrc} onClose={() => setZoomSrc(null)} />
    </div>
  );
};

interface ImageZoomModalProps {
  src: string | null;
  onClose: () => void;
}

interface ImageZoomModalProps {
  src: string | null;
  onClose: () => void;
}

const ImageZoomModal: React.FC<ImageZoomModalProps> = ({ src, onClose }) => {
  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center 
                 bg-black/20 backdrop-blur-sm
                 opacity-0 animate-[fadeIn_0.35s_ease_forwards]"
      onClick={onClose}
    >
      <img
        src={src}
        alt=""
        className="max-w-[80%] max-h-[80%] rounded-2xl
                   opacity-0 scale-[0.5] translate-y-10
                   animate-[zoomIn_0.35s_cubic-bezier(0.22,1,0.36,1)_forwards]"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Utility-only keyframes (scoped locally) */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes zoomIn {
            from { opacity: 0; transform: scale(0.5) translateY(40px); }
            to   { opacity: 1; transform: scale(4) translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default ImageZoomModal;
