// components/ui/custom-drawer.tsx
"use client";

import { description } from "@/components/chart-area-interactive";
// import * as React from "react";
// import {
//   Drawer,
//   DrawerContent,
//   DrawerHeader,
//   DrawerTitle,
// } from "@/components/ui/drawer";

import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import { useDrawerStore } from "@/store/drawer.store";
import { X } from "lucide-react";

export function CustomDrawer() {
  const {
    isOpen,
    title,
    content,
    placement = "right",
    props,
    width = "540",
    showCloseIcon,
    description,
    closeModal,
  } = useDrawerStore();

  const drawerWidth = width ? `${width}px` : "400px";

  const placementClasses = {
    right: `right-0 top-10 h-auto w-${drawerWidth} border-l data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 data-[state=open]:translate-y-0 left-[65%]`,
    left: `left-0 top-0 h-auto w-${drawerWidth} border-r data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0`,
    top: `top-0 left-0 w-full h-[300px] border-b data-[state=closed]:-translate-y-full data-[state=open]:translate-y-0`,
    bottom: `bottom-0 left-0 w-full h-[300px] border-t data-[state=closed]:translate-y-full data-[state=open]:translate-y-0`,
    center: "",
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogOverlay className="fixed inset-0 bg-black/40 z-40" />
      <DialogContent
        className={`fixed bg-white shadow-lg z-50 transition-transform duration-300 ${placementClasses[placement]} [&>button]:hidden px-0 h-auto`}
        style={{
          width:
            placement === "left" || placement === "right"
              ? drawerWidth
              : undefined,
        }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="inline-flex flex-col w-full items-center justify-center">
            <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
            {description && <p>{description}</p>}
          </div>
          {showCloseIcon && (
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );

  //   return (
  //     <Drawer open={isOpen} onOpenChange={closeModal}>
  //       <DrawerContent className={`width-[${width}]`}>
  //         <DrawerHeader>
  //           <DrawerTitle>
  //             <span>{title}</span>
  //           </DrawerTitle>
  //         </DrawerHeader>

  //         {renderContent()}
  //       </DrawerContent>
  //     </Drawer>
  //   );
}
