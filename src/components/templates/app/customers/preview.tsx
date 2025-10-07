import { Link, useParams } from "react-router";
import { ArrowLeft } from "iconsax-reactjs";
import OrderColumn from "@/columns/orders.column";
import { DataTable } from "@/components/atoms/table";

import { CardDetail } from "@/components/atoms/card/previewCard";
import { fetchCustomerPreviewQuery } from "@/queries/customers.query";
import moment from "moment";

const fieldsToDisplay = ["name", "email", "phoneNumber", "createdAt"] as const;

const PreviewCustomer = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = fetchCustomerPreviewQuery(id || "");

  return (
    <div className="space-y-10">
      <Link to={".."} className="inline-flex items-center gap-2.5">
        <ArrowLeft size={20} color="#696572" />
        <h4 className="font-family-satoshi text-text-secondary text-base font-medium">
          Customer Details
        </h4>
      </Link>

      <div className="bg-white rounded-xl p-10 border border-[#F5F5F6] flex font-family-satoshi gap-6 flex-wrap sm:flex-nowrap">
        {loading ? (
          <p className="py-10 inline-flex justify-center items-center w-full">
            Fetching data...
          </p>
        ) : (
          fieldsToDisplay.map((key) => {
            const isDate = key === "createdAt";
            const formattedValue = isDate
              ? moment(data?.[key]).format("DD-MM-YYYY")
              : data?.[key];

            return (
              <CardDetail
                key={key}
                title={isDate ? "added on" : key.replace(/([A-Z])/g, " $1")}
                value={formattedValue?.toString() || "Unknown"}
                // isLast={index === fieldsToDisplay.length - 1}
              />
            );
          })
        )}
      </div>

      {data?.my_orders && (
        <DataTable
          tableName="Orders"
          columns={OrderColumn}
          data={data?.my_orders || []}
          loading={loading}
        />
      )}
    </div>
  );
};

export default PreviewCustomer;
