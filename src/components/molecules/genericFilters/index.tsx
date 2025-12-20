import { PopoverContent } from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { CalendarOnly } from "@/components/atoms/form/calendar";
import SelectField from "@/components/atoms/form/select";
import CustomButton from "@/components/atoms/button/CustomButton";
import { useTableState } from "@/hooks/useTableState";
import { tableKeyType } from "@/components/atoms/table";

type FilterValues = Record<string, any>;

interface GenericFiltersProps {
  tableKey: tableKeyType;
}

const GENERIC_FILTERS = ["startDate", "endDate", "sortBy", "sortOrder"];

// Define extra filters per tableKey
const TABLE_SPECIFIC_FILTERS: Record<string, string[]> = {
  admin: ["adminAccess"],
  complaints: ["status"],
  customers: ["status"],
  merchants: ["status"],
  notifications: ["method", "recurringType", "sentBy", "status"],
  orders: ["orderStatus", "paymentStatus"],
  payouts: [
    "invoiceStatus",
    "paymentMethod",
    "paymentStatus",
    "payoutStatus",
    "role",
  ],
  "product-categories": [],
  riders: ["availabilityStatus", "status"],
};

const GenericFilters = ({ tableKey }: GenericFiltersProps) => {
  // Options for select fields
  const SELECT_OPTIONS: Record<string, { label: string; value: string }[]> = {
    status:
      tableKey === "complaints"
        ? [
            { label: "Resolved", value: "Resolved" },
            { label: "In Progress", value: "InProgress" },
            { label: "Pending", value: "Pending" },
            { label: "Closed", value: "Closed" },
          ]
        : [
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ],

    adminAccess: [
      { label: "Super Admin", value: "SUPER_ADMIN" },
      { label: "Admin", value: "ADMIN" },
    ],
    method: [
      { label: "Email", value: "EMAIL" },
      { label: "Push", value: "PUSH_NOTIFICATION" },
    ],
    recurringType: [
      { label: "Daily", value: "DAILY" },
      { label: "Weekly", value: "WEEKLY" },
      { label: "Monthly", value: "MONTHLY" },
    ],
    sentBy: [
      { label: "System", value: "SYSTEM" },
      { label: "Admin", value: "ADMIN" },
    ],
    orderStatus: [
      { label: "Processing", value: "Processing" },
      {
        label: "Packed and Ready for Pickup",
        value: "Parked_And_Ready_For_Pickup",
      },
      { label: "Rider Assigned", value: "Rider_Assigned" },
      { label: "In Transit", value: "In_Transit" },
      {
        label: "Awaiting Rider Acceptance",
        value: "AWAITING_RIDER_ACCEPTANCE",
      },
      { label: "Cancelled", value: "Cancelled" },
      { label: "Delivered", value: "Delivered" },
    ],
    paymentStatus: [
      { label: "Paid", value: "paid" },
      { label: "Pending", value: "pending" },
      { label: "Failed", value: "failed" },
      { label: "Cancelled", value: "CANCELLED" },
    ],
    paymentMethod: [
      { label: "Card", value: "CARD" },
      { label: "Transfer", value: "TRANSFER" },
      { label: "Cash", value: "CASH" },
    ],
    payoutStatus: [
      { label: "Pending", value: "PENDING" },
      { label: "Processed", value: "PROCESSED" },
      { label: "Failed", value: "FAILED" },
    ],
    invoiceStatus: [
      { label: "Pending", value: "PENDING" },
      { label: "Paid", value: "PAID" },
    ],
    role: [
      { label: "Rider", value: "RIDER" },
      { label: "Merchant", value: "MERCHANT" },
      { label: "Customer", value: "CUSTOMER" },
    ],
    availabilityStatus: [
      { label: "Available", value: "Available" },
      { label: "Busy With An Order", value: "Busy_With_An_Order" },
    ],
    sortBy: [
      { label: "Created At", value: "createdAt" },
      { label: "Updated At", value: "updatedAt" },
    ],
    sortOrder: [
      { label: "Ascending", value: "ASC" },
      { label: "Descending", value: "DESC" },
    ],
  };

  const { filters, update, reset } = useTableState(tableKey);

  // Determine all fields for this table
  const tableFields = [
    ...GENERIC_FILTERS,
    ...(TABLE_SPECIFIC_FILTERS[tableKey] || []),
  ];

  // Build Zod schema dynamically
  const schemaShape = tableFields.reduce((acc, field) => {
    acc[field] = z.union([z.string(), z.date()]).optional();
    return acc;
  }, {} as Record<string, any>);

  const form = useForm<FilterValues>({
    resolver: zodResolver(z.object(schemaShape)),
    defaultValues: filters,
  });

  const onSubmit = (values: FilterValues) => {
    update(values);
  };

  const onReset = () => {
    reset();
    form.reset();
  };

  return (
    <PopoverContent
      align="end"
      className="ml-4 sm:ml-0 mt-2 w-sm md:w-lg max-w-lg p-0 rounded-xl flex flex-col space-y-1.5 md:space-y-2.5"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h3 className="p-4 text-sm md:text-base font-medium border-b-2">
            Filter by
          </h3>
          {(tableFields.includes("startDate") ||
            tableFields.includes("endDate")) && (
            <div className="border-b-2 p-4 space-y-3">
              <div className="flex justify-between">
                <h3 className="font-semibold text-sm md:text-base">
                  Date Range
                </h3>
                <span
                  className="text-primary font-semibold text-sm md:text-base cursor-pointer"
                  onClick={() => {
                    form.setValue("startDate", undefined);
                    form.setValue("endDate", undefined);
                  }}
                >
                  Reset
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {tableFields.includes("startDate") && (
                  <CalendarOnly
                    name="startDate"
                    control={form.control}
                    placeholder="Start Date"
                  />
                )}

                {tableFields.includes("endDate") && (
                  <CalendarOnly
                    name="endDate"
                    control={form.control}
                    placeholder="End Date"
                  />
                )}
              </div>
            </div>
          )}

          {(() => {
            const selectFields = tableFields.filter(
              (field) => SELECT_OPTIONS[field]
            );

            if (!selectFields.length) return null;

            return (
              <div className="p-3 border-b-2 space-y-3">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-sm md:text-base">
                    Other Filters
                  </h3>
                  <span
                    className="text-primary font-semibold text-sm md:text-base cursor-pointer"
                    onClick={() => {
                      selectFields.forEach((field) =>
                        form.setValue(field as any, undefined)
                      );
                    }}
                  >
                    Reset All
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {selectFields.map((field) => (
                    <div key={field} className="space-y-1.5">
                      <span className="font-semibold text-xs md:text-sm capitalize">
                        {field.replace(/([A-Z])/g, " $1")}
                      </span>

                      <SelectField
                        placeholder={field
                          .replace(/([A-Z])/g, " $1")
                          .toUpperCase()}
                        control={form.control}
                        name={field}
                        items={SELECT_OPTIONS[field]}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Footer buttons */}
          <div className="p-4 grid grid-cols-2 space-x-1.5">
            <CustomButton
              type="button"
              variant="outline"
              size="lg"
              onClick={onReset}
            >
              Reset Filter
            </CustomButton>
            <CustomButton type="submit" size="lg">
              Filter
            </CustomButton>
          </div>
        </form>
      </Form>
    </PopoverContent>
  );
};

export default GenericFilters;
