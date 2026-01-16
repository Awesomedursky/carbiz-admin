import CustomButton from "@/components/atoms/button/CustomButton";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import React, { useState, useRef } from "react";
import { Control, useController } from "react-hook-form";
import { Check } from "@phosphor-icons/react";
import { debounce } from "lodash";
import { useTableState } from "@/hooks/useTableState";
import {
  useAssignOrdertoRider,
  useFetchAllAvailableRiders,
} from "@/queries/riders.query";
import AssignRiderSchema, {
  AssignRiderSchemaType,
} from "@/schema/assignRiderSchema";
import { useDrawerStore } from "@/store/drawer.store";
import RiderEntity from "@/types/rider.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const AssignAvailaRider = ({
  orderID,
  isPooled,
}: {
  orderID: string;
  isPooled: boolean;
}) => {
  const { closeModal } = useDrawerStore();
  const { data, loading, total, fetchMore } = useFetchAllAvailableRiders();
  const { setSearch, searchTerm, pageSize, currentPage } =
    useTableState("riders");
  const { assignOrdertoRider, assignRiderLoading } =
    useAssignOrdertoRider(orderID);
  const form = useForm<AssignRiderSchemaType>({
    resolver: zodResolver(AssignRiderSchema),
  });

  const options =
    data?.map((i: RiderEntity) => ({
      label: `${i?.firstName}- ${i?.lastName}`,
      value: i?.riderID,
    })) || [];

  const debouncedSearch = React.useMemo(
    () => debounce((value: string) => setSearch(value), 500),
    [setSearch]
  );

  const handleSubmit = async (e: AssignRiderSchemaType) => {
    await assignOrdertoRider({
      variables: {
        orderID: orderID,
        riderID: e?.riderID,
        isPoolAssignment: isPooled,
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className=" pb-2">
          <SearchableSelect
            name="riderID"
            label="Rider"
            placeholder="Search rider"
            control={form.control}
            options={options}
            loading={loading}
            searchable
            onSearch={(value) => {
              debouncedSearch(value);
            }}
            hasMore={options.length < total}
            onFetchMore={() =>
              fetchMore({
                variables: {
                  paginationQuery: {
                    page: currentPage + 1,
                    limit: pageSize,
                    searchTerm,
                  },
                },
              })
            }
          />
          <div className="flex space-x-2 mt-2">
            <CustomButton variant="outline" onClick={closeModal}>
              Cancel
            </CustomButton>
            <CustomButton loading={assignRiderLoading}>Assign</CustomButton>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AssignAvailaRider;

type Option = {
  label: string;
  value: string;
};

interface SearchableSelectProps {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  options: Option[];
  loading?: boolean;
  searchable?: boolean;
  onSearch?: (value: string) => void;
  onFetchMore?: () => void;
  hasMore?: boolean;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  name,
  control,
  label,
  placeholder = "Select option",
  options,
  searchable = true,
  onSearch,
  onFetchMore,
  hasMore = false,
  loading = false,
}) => {
  const {
    field: { value, onChange },
  } = useController({ name, control });

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync selected value → input text
  useEffect(() => {
    const selected = options.find((o) => o.value === value);
    if (selected) {
      setInputValue(selected.label);
    }
  }, [value, options]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    if (searchable) {
      onSearch?.(val);
    }
  };

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setInputValue(option.label);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-primary-dark">
          {label}
        </label>
      )}

      <input
        value={inputValue}
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onChange={handleInputChange}
        className="w-full rounded-lg border px-3 py-3 text-sm outline-none focus:border-primary transition-colors duration-300"
      />

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-primary bg-white shadow-md max-h-64 overflow-auto p-2 transition-colors duration-300">
          {loading && (
            <div className=" w-full flex items-center justify-center">
              <Spinner className="text-primary size-10" />
            </div>
          )}

          {!loading && options.length === 0 && (
            <div className="p-3 text-sm text-muted-foreground">
              No results found
            </div>
          )}

          {options.map((option) => {
            const selected = option.value === value;
            return (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`capitalize flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                  selected ? "bg-gray-50 font-medium rounded-lg" : ""
                }`}
              >
                <span>{option.label?.replaceAll("-", " ")}</span>
                {selected && <Check size={16} weight="bold" />}
              </div>
            );
          })}

          {hasMore && (
            <CustomButton
              type="button"
              onClick={onFetchMore}
              className="w-full border-t px-3 py-2 text-sm text-primary hover:bg-gray-50"
            >
              Load more
            </CustomButton>
          )}
        </div>
      )}
    </div>
  );
};
