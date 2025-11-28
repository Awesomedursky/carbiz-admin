// import { Gallery } from "iconsax-reactjs";
// import React, { useState, useEffect } from "react";
// import { Control } from "react-hook-form";
// import { Progress } from "@/components/ui/progress";

// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { useDropzone } from "react-dropzone";
// import fileUploadReq from "@/api/uploader";

// interface ImagePickerProp {
//   name: string;
//   control: Control<any>;
//   label?: string;
//   maxLength?: number;
//   multiple?: boolean;
//   defaultValue?: string | string[];
//   onChange?: (value: string) => void;
// }

// const ImagePicker: React.FC<ImagePickerProp> = ({
//   name,
//   control,
//   label,
//   maxLength = 5,
//   multiple = false,
//   defaultValue,
//   onChange,
// }) => {
//   return (
//     <FormField
//       control={control}
//       name={name}
//       render={({ field }) => {
//         // Move state outside render function to avoid recreation on each render
//         const [uploads, setUploads] = useState<File[]>([]);
//         const [previewUrls, setPreviewUrls] = useState<string[]>([]);
//         const [progress, setProgress] = useState<number>(0);

//         // Create preview URLs when uploads change
//         useEffect(() => {
//           // Revoke previous URLs to avoid memory leaks
//           previewUrls.forEach((url) => URL.revokeObjectURL(url));

//           // Create new preview URLs
//           const urls = uploads.map((file) => URL.createObjectURL(file));
//           setPreviewUrls(urls);

//           // Cleanup function to revoke URLs when component unmounts
//           return () => {
//             urls.forEach((url) => URL.revokeObjectURL(url));
//           };
//         }, [uploads]);

//         const onDrop = async (acceptedFiles: File[]) => {
//           const newFiles = multiple
//             ? [...uploads, ...acceptedFiles].slice(0, maxLength)
//             : acceptedFiles.slice(0, maxLength);

//           setUploads(newFiles);

//           try {
//             const data = await fileUploadReq({
//               pathname: "product-images",
//               payload: { productImages: newFiles },
//               onProgress: (percent) => setProgress(percent),
//             });

//             field.onChange(multiple ? data : data[0]); // send to form
//             if (onChange) onChange(multiple ? data : data[0]);
//           } catch (error) {
//             // Don't mutate state directly
//             setUploads((prevUploads) =>
//               multiple ? prevUploads.slice(0, -1) : []
//             );
//           }
//         };

//         const { getRootProps, getInputProps } = useDropzone({
//           onDrop,
//           accept: { "image/*": [] },
//           maxFiles: maxLength,
//           multiple,
//           disabled: uploads.length >= maxLength && !multiple,
//         });

//         return (
//           <FormItem className="w-full md:max-w-[50%]">
//             {label && (
//               <FormLabel className="text-sm lg:text-base text-primary-dark font-medium mb-1">
//                 {label}
//               </FormLabel>
//             )}
//             <FormControl>
//               <div
//                 className={`bg-[#FEFEFE] ${
//                   uploads.length >= 1 ? "py-0 h-48 px-0" : "py-10 px-5"
//                 } flex flex-col justify-center items-center border border-[#F3F2F4] rounded-xl font-family-satoshi text-sm space-y-4 cursor-pointer`}
//                 {...getRootProps()}
//               >
//                 {typeof defaultValue == "string" ? (
//                   <img
//                     src={typeof defaultValue == "string" ? defaultValue : ""}
//                     className="h-full md:h-[16rem] w-full rounded-xl object-cover"
//                     alt="Uploaded image preview"
//                   />
//                 ) : uploads.length == 1 && previewUrls.length == 1 ? (
//                   <img
//                     src={previewUrls[0]}
//                     className="h-full w-full rounded-xl object-cover"
//                     alt="Uploaded image preview"
//                   />
//                 ) : (
//                   <>
//                     <Gallery size="32" color="#1A191C" />
//                     <p>
//                       <span className="font-bold">Upload a file</span> or drag
//                       and drop
//                     </p>
//                     <input {...getInputProps()} />
//                     <p>PNG, JPEG, PDF. Up to 5mb</p>
//                   </>
//                 )}
//               </div>
//             </FormControl>
//             {progress > 0 && progress < 100 && <Progress value={progress} />}
//             <FormMessage />
//           </FormItem>
//         );
//       }}
//     />
//   );
// };

// export default ImagePicker;

import React, { useState, useEffect, useRef } from "react";
import { Control } from "react-hook-form";
import { DocumentUpload, Gallery } from "iconsax-reactjs";
import fileUploadReq from "@/api/uploader";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomButton from "../button/CustomButton";
import { useToast } from "@/hooks/Toast";

interface ImagePickerProp {
  name: string;
  control: Control<any>;
  label?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const ImagePicker: React.FC<ImagePickerProp> = ({
  name,
  control,
  label,
  defaultValue,
  onChange,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultValue || null
  );
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const { handleSuccess, handleError } = useToast();

  useEffect(() => {
    return () => {
      if (previewUrl && selectedFile) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl, selectedFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (fieldOnChange: (value: any) => void) => {
    if (!selectedFile) {
      inputRef.current?.click();
      return;
    }

    try {
      setUploading(true);
      const data = await fileUploadReq({
        pathname: "product-images",
        payload: { productImages: [selectedFile] },
        onProgress: (percent) => setProgress(percent),
      });

      if (data) {
        handleSuccess("Image uploaded successfully");
      }

      const uploadedUrl = Array.isArray(data) ? data[0] : data;

      fieldOnChange(uploadedUrl);
      if (onChange) onChange(uploadedUrl);
      setPreviewUrl(uploadedUrl);
      setSelectedFile(null);
      setProgress(0);
    } catch (error) {
      handleError("Upload failed", "There was an error uploading the image.");
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full md:max-w-[50%]">
          {label && (
            <FormLabel className="text-sm lg:text-base text-primary-dark font-medium mb-1">
              {label}
            </FormLabel>
          )}
          <FormControl>
            <div className="flex flex-col items-center space-y-3">
              <div
                className={`w-full h-48 bg-[#FEFEFE] border border-[#F3F2F4] rounded-xl flex justify-center items-center overflow-hidden`}
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Uploaded"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="flex flex-col items-center space-y-2 text-sm">
                    <Gallery size="32" color="#1A191C" />
                    <p className="font-bold">No image selected</p>
                    <p>PNG, JPEG. Max 5MB</p>
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={inputRef}
                onChange={handleFileChange}
              />

              <CustomButton
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
                onClick={() => handleUpload(field.onChange)}
                loading={uploading}
              >
                <DocumentUpload size="18" />
                <span>{selectedFile ? "Upload" : "Select Image"}</span>
              </CustomButton>
              {progress > 0 && uploading && (
                <Progress className="w-full" value={progress} />
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ImagePicker;
