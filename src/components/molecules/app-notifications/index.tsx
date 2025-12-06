import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { useDrawerStore } from "@/store/drawer.store";
import { Content } from "./popoverContent";

export const AppNotifcations = ({
  children,
  content,
  popoverType,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  popoverType: "popover" | "filter";
}) => {
  const { isOpen, closeModal, type } = useDrawerStore();

  const open = type === popoverType && isOpen;

  return (
    <Popover open={open} onOpenChange={(open) => !open && closeModal()}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      {content}
    </Popover>
  );
};
