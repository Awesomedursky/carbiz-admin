import {
  MERCHNAT_COUNT,
  PROFILE_ADMIN,
  REVENUE,
  TOTAL_CUSTOMER,
} from "@/api/dashboard";
import { useToast } from "@/hooks/Toast";
import { useQuery } from "@apollo/client";

interface profileAdmin {
  profileAdmin: {
    success: boolean;
    message: string;
    payload: {
      adminID: string;
      createdAt: string;
      deletedAt: string;
      email: string;
      id: string;
      isVerified: string;
      name: string;
      phoneNumber: string;
      profilePics: string;
      role: string;
      status: string;
      updatedAt: string;
    };
  };
}

interface AdminFetchMerchantCount {
  AdminFetchMerchantCount: {
    errors: boolean;
    message: string;
    payload: any;
  };
}

interface AdminFetchCustomerCount {
  AdminFetchCustomerCount: {
    errors: boolean;
    message: string;
    payload: any;
  };
}

interface MerchantsTotalRevenueWithDeliveryFee {
  MerchantsTotalRevenueWithDeliveryFee: {
    errors: boolean;
    message: string;
    payload: any;
  };
}

export const useMerchantProfile = () => {
  const { handleError } = useToast();

  const { loading, error, data } = useQuery<profileAdmin>(PROFILE_ADMIN, {
    onCompleted: () => {
      // console.log("Profile Data:", data);
    },
    onError: (error) => {
      handleError(error, "Error fetching Admin profile");
    },
    fetchPolicy: "cache-and-network",
  });

  const merchantCount = useQuery<AdminFetchMerchantCount>(MERCHNAT_COUNT, {
    onCompleted: () => {},
    onError: (error) => {
      handleError(error, "Error fetching  product count");
    },
    fetchPolicy: "cache-and-network",
  });

  const customerCount = useQuery<AdminFetchCustomerCount>(TOTAL_CUSTOMER, {
    onCompleted: () => {},
    onError: (error) => {
      handleError(error, "Error fetching  customer count");
    },
    fetchPolicy: "cache-and-network",
  });

  const revenue = useQuery<MerchantsTotalRevenueWithDeliveryFee>(REVENUE, {
    onCompleted: () => {},
    onError: (error) => {
      handleError(error, "Error fetching  revenue");
    },
    fetchPolicy: "cache-and-network",
  });

  return {
    loading,
    error,
    data: data?.profileAdmin?.payload,
    merchantCount,
    customerCount,
    revenue,
  };
};
