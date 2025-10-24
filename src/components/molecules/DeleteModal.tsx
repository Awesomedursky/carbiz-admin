"use client";

import { Button } from "@/components/ui/button";
import { useDrawerStore } from "@/store/drawer.store";

type DeleteModalProps = {
  itemName?: string;
  
  onDelete: () => void;
};

const DeleteModal = ({ itemName = "Item", onDelete }: DeleteModalProps) => {
  const { closeModal } = useDrawerStore();

  return (
    <div className="text-center overflow-hidden">
      <p className="text-sm text-gray-500 mt-1">
        Are you sure you want to delete this {itemName.toLowerCase()}?
        <br />
        This action cannot be undone.
      </p>

      <div className="flex flex-col gap-2">
        <Button
          variant="destructive"
          onClick={() => {
            onDelete();
            closeModal();
          }}
          className="w-full mt-6"
        >
          Delete {itemName}
        </Button>

        <Button
          variant="outline"
          onClick={closeModal}
          className="w-full"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeleteModal;
