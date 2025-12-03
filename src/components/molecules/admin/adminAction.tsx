import React from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDrawerStore } from "@/store/drawer.store";
import GenericDisable from "../genericDisable";
import { adminEntity } from "@/types/admin.type";
import AdminDetail from "./adminDetail";
import NewAdminForm from "@/components/organisms/form/newAdmin.form";

interface adminProps {
  admin: adminEntity;
}

const Admin: React.FC<adminProps> = ({ admin }) => {
  const { openModal } = useDrawerStore();

  const handleViewDetails = () => {
    openModal({
      type: "drawer",
      title: "Admin Details",
      content: AdminDetail,
      props: { admin },
      placement: "right",
    });
  };

  const onOpenModal = () => {
    openModal({
      type: "dialog",
      content: NewAdminForm,
      props: { type: true, id: admin.adminID },
    });
  };

  const handleDeleteModal = () => {
    openModal({
      type: "dialog",
      content: GenericDisable,
      title: "Admin",
      props: {
        id: admin?.adminID,
        name: admin?.name,
        type: "delete",
        state: "admin",
      },
    });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4 text-gray-600" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleViewDetails}>View</DropdownMenuItem>
        <DropdownMenuItem onClick={onOpenModal}>Update</DropdownMenuItem>
        <DropdownMenuItem className=" text-red-400" onClick={handleDeleteModal}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Admin;
