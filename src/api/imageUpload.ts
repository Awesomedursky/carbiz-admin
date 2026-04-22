import axios from "axios";

export const uploadImageRest = (
  files: File[],
  onProgress?: (percent: number) => void,
): Promise<string[]> => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("productImages", file); // Ensure backend expects this key
  });

  return axios
    .post(
      "https://carbiz-backend-0q3t.onrender.com/api/carbiz/v1/files/upload/product-images",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e: any) => {
          if (onProgress) {
            const percent = Math.round((e.loaded * 100) / e.total);
            onProgress(percent);
          }
        },
      },
    )
    .then((res) => res.data.payload); // should be an array of URLs
};

export const submitImageMetadata = async (
  images: { url: string; isFeatured: boolean }[],
) => {
  const res = await axios.post("/api/images/submit", { images });
  return res.data;
};
