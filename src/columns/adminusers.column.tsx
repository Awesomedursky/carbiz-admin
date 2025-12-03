import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { adminEntity } from "@/types/admin.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AdminActions from "@/components/molecules/admin/adminAction";

const AdminColumns: ColumnDef<adminEntity>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className=" pl-3 md:pl-7">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className=""
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className=" pl-3 md:pl-7">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: () => (
      <div className="normal text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none ">
        Name
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal py-3.5 normal flex items-center gap-1.5">
          <Avatar>
            <AvatarImage src={row?.original?.profilePics} />
            <AvatarFallback />
          </Avatar>
          <p>{row.getValue("name")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] px-7 py-3.5 border-none">
        Email
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.">{row.getValue("email")}</div>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] px-7 py-3.5 border-none">
        Phone Number
      </div>
    ),
    cell: ({ row }) => {
      const phone = row.getValue("phoneNumber")?.toString();
      return (
        <div className=" font-normal px-7 py-3.">
          {phone?.replaceAll("-", "") ?? "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] px-7 py-3.5 border-none">
        Role
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3 capitalize">
          {row.getValue("role")}
        </div>
      );
    },
  },
  {
    accessorKey: "access",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] px-7 py-3.5 border-none">
        Access
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3 capitalize">
          {row?.original?.adminAccess?.replaceAll("_", " ") ?? "-"}
        </div>
      );
    },
  },
  {
    id: "Action",
    cell: ({ row }) => {
      return <AdminActions admin={row.original} />;
    },
  },
];

export default AdminColumns;
