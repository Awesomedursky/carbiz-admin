import axios from "axios";

const init = axios.create({
  baseURL:
    "https://carbiz-backend-0q3t.onrender.com/api/carbiz/v1/files/upload/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const fileUploadReq = async ({
  pathname,
  payload,
  onProgress,
}: {
  pathname: string;
  payload: Record<string, File[]>;
  onProgress?: (value: number) => void;
}) => {
  const formData = new FormData();

  // Append files to formData
  Object.entries(payload).forEach(([key, files]) => {
    files.forEach((file) => {
      formData.append(key, file);
    });
  });

  try {
    const response = await init.post(pathname, formData, {
      onUploadProgress: (progress: any) => {
        if (onProgress) {
          const percent = Math.round((progress.loaded * 100) / progress.total);
          onProgress(percent);
        }
      },
    });
    const { success, message, payload } = response.data;

    if (!success) {
      throw new Error(message);
    }

    return payload;
  } catch (error: any) {
    console.error("File upload failed:", error.response?.data || error.message);
    throw error;
  }
};

export default fileUploadReq;
