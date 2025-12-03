import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { useDrawerStore } from "@/store/drawer.store";
import { Content } from "./popoverContent";

export const AppNotifcations = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isOpen, closeModal, type } = useDrawerStore();

  //   if (type !== "popover") return null;

  return (
    <Popover
      open={type === "popover" && isOpen}
      onOpenChange={(open) => !open && closeModal()}
    >
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <Content />
    </Popover>
  );
};
