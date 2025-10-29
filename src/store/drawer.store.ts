import { create } from "zustand";
import { ReactNode, ComponentType } from "react";

export type DrawerPlacement =
  | "right"
  | "left"
  | "top"
  | "bottom"
  | "center"
  | null;
export type DrawerType = "dialog" | "drawer" | null;

export interface DrawerContentProps {
  [key: string]: any;
}

export interface DrawerOptions<T = any> {
  title?: string;
  type?: DrawerType;
  content?: ReactNode | ComponentType<T>;
  placement?: DrawerPlacement;
  props?: DrawerContentProps | null;
  width?: number | null;
  showCloseIcon?: boolean;
  description?: string;
}

interface DrawerState<T = any> extends DrawerOptions<T> {
  isOpen: boolean;
  openModal: (options: DrawerOptions<T>) => void;
  closeModal: () => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  isOpen: false,
  type: null,

  openModal: ({
    type = "drawer",
    title,
    content,
    placement = "right",
    props,
    width,
    showCloseIcon = true,
    description,
  }) =>
    set({
      isOpen: true,
      type,
      title,
      content,
      placement,
      props,
      width,
      showCloseIcon,
      description,
    }),

  closeModal: () =>
    set({
      isOpen: false,
    }),
}));
