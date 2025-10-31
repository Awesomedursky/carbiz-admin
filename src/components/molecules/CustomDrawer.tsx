"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDrawerStore } from "@/store/drawer.store";

export const CustomDrawer = () => {
  const { isOpen, closeModal, type, title, content, props, placement } =
    useDrawerStore();

  const renderContent = () => {
    if (!content) return null;

    // If `content` is a component (function or class)
    if (typeof content === "function") {
      const Component = content;
      return <Component {...props} />;
    }

    // Otherwise, it’s a ReactNode (JSX, element, fragment, etc.)
    return content;
  };

  if (!type) return null;

  return (
    <>
      {type === "drawer" && (
        <Drawer open={isOpen} onOpenChange={(open) => !open && closeModal()}>
          <DrawerContent
            className={`w-full sm:w-[480px] ${
              placement === "right" ? "ml-auto" : ""
            }`}
          >
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
            </DrawerHeader>
            {renderContent()}
          </DrawerContent>
        </Drawer>
      )}

      {type === "dialog" && (
        <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            {renderContent()}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
