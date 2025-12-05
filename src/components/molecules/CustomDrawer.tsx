import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  // DialogHeader,
  // DialogTitle,
} from "@/components/ui/dialog";
import { useDrawerStore } from "@/store/drawer.store";

export const CustomDrawer = () => {
  const {
    isOpen,
    closeModal,
    type,
    title,
    content,
    props,
    placement,
    description,
    width,
  } = useDrawerStore();

  const renderContent = () => {
    if (!content) return null;

    // If `content` is a component (function or class)
    if (typeof content === "function") {
      const Component = content;
      return <Component {...props} />;
    }
    return content;
  };

  if (!type) return null;

  return (
    <>
      {type === "drawer" && (
        <Drawer open={isOpen} onOpenChange={(open) => !open && closeModal()}>
          <DrawerContent
            className={`h-4/5 sm:h-[calc(100vh-2rem)] w-full sm:w-[480px] ${
              placement === "right" ? "ml-auto" : ""
            }`}
          >
            <DrawerHeader className=" border-[#F1ECF9] border-b-2 sticky sm:top-0 z-20">
              <DrawerTitle className="pt-3">{title}</DrawerTitle>
            </DrawerHeader>
            <div className=" overflow-y-auto scrollbar scroll-smooth ">
              {renderContent()}
            </div>
          </DrawerContent>
        </Drawer>
      )}

      {type === "dialog" && (
        <Dialog
          open={isOpen}
          onOpenChange={(open) => !open && closeModal()}
          // modal={false}
        >
          <DialogContent
            style={{ width: width ? width : "" }}
            showCloseButton={false}
          >
            {/* <DialogHeader className=" flex items-center">
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader> */}
            {description && <p className="text-center ">{description}</p>}
            {renderContent()}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
