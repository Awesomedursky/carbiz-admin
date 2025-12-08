import { PROFILE_ADMIN } from "@/api/admin.profile";
import {
  MERCHNAT_COUNT,
  REVENUE,
  RIDERS_COUNT,
  TOTAL_CUSTOMER,
} from "@/api/dashboard";
import { useToast } from "@/hooks/Toast";
import { useAuthStore } from "@/store/auth.store";
import { adminEntity } from "@/types/admin.type";
import { useQuery } from "@apollo/client";

interface profileAdmin {
  profileAdmin: {
    success: boolean;
    message: string;
    payload: adminEntity;
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

interface AdminFetchRiderCount {
  AdminFetchRiderCount: {
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

export const useAdminProfile = () => {
  const { handleError } = useToast();
  const { setUser } = useAuthStore();

  const { loading, error, data } = useQuery<profileAdmin>(PROFILE_ADMIN, {
    onCompleted: (response) => {
      if (response?.profileAdmin?.payload) {
        setUser(response?.profileAdmin?.payload);
      }
    },
    onError: (error) => {
      handleError(error, "Error fetching Admin profile");
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    loading,
    error,
    data: data?.profileAdmin?.payload,
  };
};

export const useFetchAdminMetrics = () => {
  const { handleError } = useToast();
  const merchantCount = useQuery<AdminFetchMerchantCount>(MERCHNAT_COUNT, {
    onCompleted: () => {},
    onError: (error) => {
      handleError(error, "Error fetching  product count");
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    pollInterval: 100000,
  });

  const customerCount = useQuery<AdminFetchCustomerCount>(TOTAL_CUSTOMER, {
    onCompleted: () => {},
    onError: (error) => {
      handleError(error, "Error fetching  customer count");
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    pollInterval: 100000,
  });

  const ridersCount = useQuery<AdminFetchRiderCount>(RIDERS_COUNT, {
    onCompleted: () => {},
    onError: (error) => {
      handleError(error, "Error fetching  customer count");
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    pollInterval: 100000,
  });

  const revenue = useQuery<MerchantsTotalRevenueWithDeliveryFee>(REVENUE, {
    onCompleted: () => {},
    onError: (error) => {
      handleError(error, "Error fetching  revenue");
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    pollInterval: 100000,
  });

  return {
    merchantCount,
    customerCount,
    ridersCount,
    revenue,
  };
};
