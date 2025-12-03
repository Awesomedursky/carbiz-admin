import {
  PROFILE_ADMIN,
  UPDATE_CURRENT_USER_PROFILE,
} from "@/api/admin.profile";
import { useToast } from "@/hooks/Toast";
import { adminEntity } from "@/types/admin.type";
import { useMutation } from "@apollo/client";

interface AdminProfileResponseType {
  success: boolean;
  message: string;
  error: string;
  payload: adminEntity;
}

type updateAdminInput = {
  name: string;
  phoneNumber: string;
  profilePictureUrl: string;
};

const useAdminMutation = () => {
  const updateAdminProfile = () => {
    const { handleError, handleSuccess } = useToast();

    const [updateAdmin, { loading }] = useMutation<
      AdminProfileResponseType,
      { input: updateAdminInput }
    >(UPDATE_CURRENT_USER_PROFILE, {
      refetchQueries: [PROFILE_ADMIN],
      onCompleted: (data) => {
        handleSuccess("Profile updated successfully", data.message);
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
