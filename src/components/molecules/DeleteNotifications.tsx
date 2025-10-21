"use client";

import { Button } from "@/components/ui/button";
import { useDrawerStore } from "@/store/drawer.store";

type DeleteNotificationProps = {
  notificationTitle: string;
  onDelete: () => void;
};

const DeleteNotification = ({
  onDelete,
}: DeleteNotificationProps) => {
  const { closeModal } = useDrawerStore();

  return (
    <div className=" text-center overflow-hidden">
      <div>
        {/* // <h2 className="text-xl text-center font-semibold">Delete Notification</h2> */}

        <p className="text-sm text-center text-gray-500 mt-1">
          Are you sure you want to delete?
          <br />
          This action cannot be undone.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          variant="destructive"
          onClick={() => {
            onDelete();
            closeModal();
          }}
          className="w-70% mt-9"
        >
          Delete Notification
        </Button>
      </div>
    </div>
  );
};

export default DeleteNotification;
