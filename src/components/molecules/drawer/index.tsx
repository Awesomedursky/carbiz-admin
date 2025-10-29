import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { useDrawerStore } from "@/store/drawer.store";

export function CustomDrawer() {
  const { type, isOpen, closeModal } = useDrawerStore();

  if (!(type === "drawer" && isOpen)) return null;

  return (
    <Drawer>
      <DrawerTrigger asChild>Opem Modal</DrawerTrigger>
      <DrawerContent
      // className={cn(
      //   "fixed right-0 top-0 h-full  bg-white border-l border-gray-200 shadow-lg",
      //   "data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right"
      // )}
      >
        Test
      </DrawerContent>
    </Drawer>
  );
}
