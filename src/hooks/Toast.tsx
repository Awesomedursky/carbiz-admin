import { toast } from "sonner";

export function useToast() {
  const TOAST_ID = "global-toast";
  const handleInfo = (message: string, description?: string) => {
    toast.info(message, {
      description,
      id: TOAST_ID,
    });
  };

  const handleSuccess = (message: string, description?: string) => {
    toast.success(message, {
      description,
      id: TOAST_ID,
    });
  };

  const handleError = (error: Error | string, description?: string) => {
    const errorMessage = typeof error === "string" ? error : error.message;
    toast.error(errorMessage, {
      description,
      id: TOAST_ID,
    });
  };

  return {
    handleInfo,
    handleSuccess,
    handleError,
  };
}
