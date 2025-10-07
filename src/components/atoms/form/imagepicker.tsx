import { Gallery } from "iconsax-reactjs";
import React, { useState, useEffect } from "react";
import { Control } from "react-hook-form";
import { Progress } from "@/components/ui/progress";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useDropzone } from "react-dropzone";
import fileUploadReq from "@/api/uploader";

interface ImagePickerProp {
  name: string;
  control: Control<any>;
  label?: string;
  maxLength?: number;
  multiple?: boolean;
  defaultValue?: string | string[];
  onChange?: (value: string) => void;
}

const ImagePicker: React.FC<ImagePickerProp> = ({
  name,
  control,
  label,
  maxLength = 5,
  multiple = false,
  defaultValue,
  onChange,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // Move state outside render function to avoid recreation on each render
        const [uploads, setUploads] = useState<File[]>([]);
        const [previewUrls, setPreviewUrls] = useState<string[]>([]);
        const [progress, setProgress] = useState<number>(0);

        // Create preview URLs when uploads change
        useEffect(() => {
          // Revoke previous URLs to avoid memory leaks
          previewUrls.forEach((url) => URL.revokeObjectURL(url));

          // Create new preview URLs
          const urls = uploads.map((file) => URL.createObjectURL(file));
          setPreviewUrls(urls);

          // Cleanup function to revoke URLs when component unmounts
          return () => {
            urls.forEach((url) => URL.revokeObjectURL(url));
          };
        }, [uploads]);

        const onDrop = async (acceptedFiles: File[]) => {
          const newFiles = multiple
            ? [...uploads, ...acceptedFiles].slice(0, maxLength)
            : acceptedFiles.slice(0, maxLength);

          setUploads(newFiles);

          try {
            const data = await fileUploadReq({
              pathname: "product-images",
              payload: { productImages: newFiles },
              onProgress: (percent) => setProgress(percent),
            });

            field.onChange(multiple ? data : data[0]); // send to form
            if (onChange) onChange(multiple ? data : data[0]);
          } catch (error) {
            // Don't mutate state directly
            setUploads((prevUploads) =>
              multiple ? prevUploads.slice(0, -1) : []
            );
          }
        };

        const { getRootProps, getInputProps } = useDropzone({
          onDrop,
          accept: { "image/*": [] },
          maxFiles: maxLength,
          multiple,
          disabled: uploads.length >= maxLength && !multiple,
        });

        return (
          <FormItem className="w-full md:max-w-[50%]">
            {label && (
              <FormLabel className="text-sm lg:text-base text-primary-dark font-medium mb-1">
                {label}
              </FormLabel>
            )}
            <FormControl>
              <div
                className={`bg-[#FEFEFE] ${
                  uploads.length >= 1 ? "py-0 h-48 px-0" : "py-10 px-5"
                } flex flex-col justify-center items-center border border-[#F3F2F4] rounded-xl font-family-satoshi text-sm space-y-4 cursor-pointer`}
                {...getRootProps()}
              >
                {typeof defaultValue == "string" ? (
                  <img
                    src={typeof defaultValue == "string" ? defaultValue : ""}
                    className="h-full md:h-[16rem] w-full rounded-xl object-cover"
                    alt="Uploaded image preview"
                  />
                ) : uploads.length == 1 && previewUrls.length == 1 ? (
                  <img
                    src={previewUrls[0]}
                    className="h-full w-full rounded-xl object-cover"
                    alt="Uploaded image preview"
                  />
                ) : (
                  <>
                    <Gallery size="32" color="#1A191C" />
                    <p>
                      <span className="font-bold">Upload a file</span> or drag
                      and drop
                    </p>
                    <input {...getInputProps()} />
                    <p>PNG, JPEG, PDF. Up to 5mb</p>
                  </>
                )}
              </div>
            </FormControl>
            {progress > 0 && progress < 100 && <Progress value={progress} />}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default ImagePicker;
