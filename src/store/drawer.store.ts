// store/drawer-store.ts
import { create } from "zustand";
import { ReactNode, ComponentType } from "react";

export type DrawerContentProps<T = any> = {
  [key: string]: any; // allows flexible props
};

interface OpenDrawerProps<T = any> {
  title?: string;
  // can accept React component or ReactNode
  content?: ReactNode | ComponentType<T>;
  placement?: "right" | "left" | "top" | "bottom" | "center";
  props?: DrawerContentProps<T>;
  width?: number;
  showCloseIcon?: boolean;
  description?: string;
}

interface DrawerState<T = any> {
  isOpen: boolean;
  showCloseIcon?: boolean;
  description?: string;
  title?: string;
  width?: number;
  content?: ReactNode | ComponentType<T>;
  placement?: "right" | "left" | "top" | "bottom" | "center";
  props?: DrawerContentProps<T>;
  openModal: (props: OpenDrawerProps<T>) => void;
  closeModal: () => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  isOpen: false,
  openModal: ({
    title,
    content,
    placement = "right",
    props,
    showCloseIcon = true,
    description,
  }) =>
    set({
      isOpen: true,
      title,
      content,
      placement,
      props,
      showCloseIcon,
      description,
    }),
  closeModal: () => set({ isOpen: false }),
}));
