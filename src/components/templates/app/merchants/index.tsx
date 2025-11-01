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
        actions
        columnKey="merchantID"
        loading={loading}
      >
        {/* <Button
          variant="default"
          className="md:py-6  border-0 shadow text-sm font-bold"
        >
          <Plus className="size-4" />
          New Merchant
        </Button> */}
      </DataTable>
    </>
  );
};

export default index;
