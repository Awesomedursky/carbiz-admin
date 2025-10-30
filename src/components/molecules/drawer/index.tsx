import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  // DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { useDrawerStore } from "@/store/drawer.store";
import { useState } from "react";

export function CustomDrawer() {
  const { type, isOpen, closeModal } = useDrawerStore();

  if (!(type === "drawer" && isOpen)) return null;

  return (
    <Drawer open={isOpen} onOpenChange={closeModal}>
      <DrawerContent className="bg-white">
        <div className="p-4">
          <DrawerHeader>
            <DrawerTitle>Test Drawer</DrawerTitle>
            <DrawerDescription>
              Floated fixed to the right side
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 p-4">Your content goes here...</div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
