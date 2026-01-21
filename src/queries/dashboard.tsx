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
import { useEffect } from "react";

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
    onError: (error) => {
      handleError(error, "Error fetching Admin profile");
    },
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-first",
  });
  
  const profile = data?.profileAdmin?.payload;
  useEffect(() => {
    if (profile) {
      setUser(profile);
    }
  }, [profile, setUser]);





  return {
    loading,
    error,
    data: data?.profileAdmin?.payload,
  };
};

export const useFetchAdminMetrics = () => {
  const { handleError } = useToast();
  const merchantCount = useQuery<AdminFetchMerchantCount>(MERCHNAT_COUNT, {
    onError: (error) => {
      handleError(error, "Error fetching  product count");
    },
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-first",
    pollInterval: 300000,
  });

  const customerCount = useQuery<AdminFetchCustomerCount>(TOTAL_CUSTOMER, {
    onError: (error) => {
      handleError(error, "Error fetching  customer count");
    },
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-first",
    pollInterval: 300000,
  });

  const ridersCount = useQuery<AdminFetchRiderCount>(RIDERS_COUNT, {
    onError: (error) => {
      handleError(error, "Error fetching  customer count");
    },
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-first",
    pollInterval: 300000,
  });

  const revenue = useQuery<MerchantsTotalRevenueWithDeliveryFee>(REVENUE, {
    onError: (error) => {
      handleError(error, "Error fetching  revenue");
    },
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-first",
    pollInterval: 300000,
  });

  return {
    merchantCount,
    customerCount,
    ridersCount,
    revenue,
  };
};
