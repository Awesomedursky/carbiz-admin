import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Control } from "react-hook-form";
import React from "react";
import { ImagePlus } from "lucide-react";
import axios from "axios";

interface ProfileImageUploadProps {
  control: Control<any>;
  name: string;
  label?: string;
  description?: string;
  uploadUrl?: string; // Your upload endpoint
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  control,
  name,
  label = "Profile Image",
  description,
  uploadUrl = "https://carbiz-backend-euek.onrender.com/graphql/api/carbiz/v1/files/upload/profile-picture",
}) => {
  const [preview, setPreview] = React.useState<string | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const handleUpload = async (file: File, onChange: (url: string) => void) => {
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setProgress(0);

    try {
      const response = await axios.post(
        uploadUrl,
        { profileImage: formData },
        {
          headers: {
            "x-apollo-operation-name": "uploadProfileImage",
          },
          onUploadProgress: (event) => {
            const percent = Math.round(
              (event.loaded * 100) / (event.total || 1)
            );
            setProgress(percent);
          },
        }
      );

      const imageUrl = response.data?.url;

      if (imageUrl) {
        setPreview(imageUrl);
        onChange(imageUrl);
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <div className="flex flex-col gap-3">
              {preview || field.value ? (
                <img
                  src={preview || field.value}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                  <ImagePlus className="w-6 h-6 text-muted-foreground" />
                </div>
              )}

              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleUpload(file, field.onChange);
                  }
                }}
              />

              {uploading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Button variant="outline" size="sm" disabled>
                    Uploading...
                  </Button>
                  <span>{progress}%</span>
                </div>
              )}
            </div>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProfileImageUpload;
