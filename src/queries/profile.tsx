import { UPDATE_CURRENT_USER_PROFILE } from "@/api/admin.profile";
import { useToast } from "@/hooks/Toast";
import { useMutation } from "@apollo/client";

interface AdminProfileResponseType {
  success: boolean;
  message: string;
  error: string;
  payload: {
    adminID: string;
    createdAt: Date;
    email: string;
    id: number;
    isVerified: Boolean;
    name: string;
    phoneNumber: string;
    profilePics: string;
    role: string;
    status: string;
    updatedAt: Date;
  };
}

type updateAdminInput = {
  name: string;
  phoneNumber: string;
  profilePictureUrl:string;
};

const useAdminMutation = () => {
  const updateAdminProfile = () => {
    const { handleError, handleSuccess } = useToast();

    const [updateAdmin, { loading }] = useMutation<
      AdminProfileResponseType,
      { input: updateAdminInput }
    >(UPDATE_CURRENT_USER_PROFILE, {
      onCompleted: (data) => {
        console.log(data);
      },
      onError: (error) => {
        handleError("Update profile error", error.message);
      },
    });

    return { mutate: updateAdmin, loading };
  };

  return { updateAdminProfile };
};

export default useAdminMutation;
