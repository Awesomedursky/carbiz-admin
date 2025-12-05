// import { Plus } from "lucide-react";
// import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/atoms/table";
import useMerchantQuery from "@/queries/merchants";
import MerchantColumn from "@/columns/merchants.column";

const index = () => {
  const { data, loading } = useMerchantQuery();

  return (
    <>
      <DataTable
        tableName="Merchants"
        columns={MerchantColumn}
        data={(data || []).map((merchant) => ({
          ...merchant,
          status: merchant.status as "string",
        }))}
        columnKey="merchantID"
        loading={loading}
      />
    </>
  );
};

export default index;
