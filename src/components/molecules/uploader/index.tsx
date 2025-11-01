import { uploadImageRest } from "@/api/imageUpload";
import CircularProgress from "@/components/atoms/progress";
import { ImagePlus } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { UseFormSetValue } from "react-hook-form";
import { ProductSchemaType } from "@/schema/products.schema";

type ImageItem = {
  id: string;
  file: File | null;
  url: string;
  progress: number;
  uploading: boolean;
  error: string | null;
  isFeatured: boolean;
};

interface UploaderProps {
  setValue: UseFormSetValue<ProductSchemaType>;
  value: ProductSchemaType["productImages"];
  error?: string;
}

const Uploader: React.FC<UploaderProps> = ({ setValue, error }) => {
  const [images, setImages] = useState<ImageItem[]>([]);

  const updateForm = (imgs: ImageItem[]) => {
    const uploaded = imgs
      .filter((img) => !img.uploading && !img.error)
      .map(({ url }) => url);
    setValue("productImages", uploaded, { shouldValidate: true });
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newItems: ImageItem[] = acceptedFiles.map((file) => ({
        id: uuidv4(),
        file,
        url: URL.createObjectURL(file),
        progress: 0,
        uploading: true,
        error: null,
        isFeatured: false,
      }));

      setImages((prev) => {
        const updated = [...prev, ...newItems];
        updateForm(updated);
        return updated;
      });

      const batchSize = 5;
      for (let i = 0; i < newItems.length; i += batchSize) {
        const batch = newItems.slice(i, i + batchSize);
        const batchFiles = batch.map((item) => item.file!) as File[];

        uploadImageRest(batchFiles, (progress) => {
          batch.forEach((item) => {
            setImages((prev) =>
              prev.map((img) =>
                img.id === item.id ? { ...img, progress } : img
              )
            );
          });
        })
          .then((urls) => {
            setImages((prev) => {
              const updated = prev.map((img) => {
                const batchIndex = batch.findIndex((b) => b.id === img.id);
                if (batchIndex !== -1) {
                  return {
                    ...img,
                    url: urls[batchIndex],
                    uploading: false,
                  };
                }
                return img;
              });

              updateForm(updated);
              return updated;
            });
          })
          .catch(() => {
            batch.forEach((item) => {
              setImages((prev) =>
                prev.map((img) =>
                  img.id === item.id
                    ? { ...img, uploading: false, error: "Upload failed" }
                    : img
                )
              );
            });
          });
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 5,
    disabled: images.length >= 5,
  });

  const setAsFeatured = (id: string) => {
    setImages((prev) => {
      const updated = prev
        .map((img) => ({ ...img, isFeatured: img.id === id }))
        .sort((a, b) =>
          a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1
        );
      updateForm(updated);
      return updated;
    });
  };

  return (
    <div>
      <div
        className={`rounded border-2 border-dashed m-5 p-6 flex items-center justify-center flex-col ${
          images.length >= 5 ? "cursor-not-allowed" : "cursor-pointer"
        } ${isDragActive ? "bg-background-light border-primary" : ""}`}
        {...getRootProps()}
      >
        <ImagePlus className="text-primary mb-3.5" />
        <h3 className="text-primary font-[700]">
          {isDragActive ? (
            <span className="text-black font-normal">Drop the Files here</span>
          ) : (
            <span className="text-black font-normal">or drag and drop</span>
          )}
        </h3>
        <input {...getInputProps()} accept="image/*" multiple />
        <p className="text-[#A990DD] text-xs">
          PNG, JPG or GIF (max. 800x400px)
        </p>
      </div>

      {error && <p className="text-red-500 text-sm mt-1 px-6">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 pb-6">
        {images.map((img) => (
          <div
            className="relative rounded-sm border overflow-hidden"
            key={img.id}
          >
            <img
              src={img.url}
              alt="preview"
              style={{ width: "100%", height: 100, objectFit: "cover" }}
            />
            {img.uploading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <CircularProgress progress={img.progress} />
              </div>
            )}
            {img.error && (
              <p className="absolute bottom-1 left-1 text-sm text-red-500">
                {img.error}
              </p>
            )}
            {!img.uploading && !img.error && (
              <button
                type="button"
                className={`absolute bg-[#68655F] text-2xl px-2 rounded-sm top-1 right-1 cursor-pointer z-20 ${
                  img.isFeatured ? "text-[gold]" : "text-[#B3B2AF]"
                }`}
                onClick={() => setAsFeatured(img.id)}
              >
                ★
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Uploader;
