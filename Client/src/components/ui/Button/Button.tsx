import classes from "./Button.module.css"
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import {cn} from "../../../utils/utils";

export const buttonVariants = cva([classes.button, "subtitle"], {
  variants: {
    variant: {
      primary: ["bg-primary", "hover:bg-primary/80"],
      destructive: ["bg-red-700", "hover:bg-red-700/80"],
      outline: ["border", "hover:bg-background/20", "dark:hover:bg-dark-background/20"],
      ghost: ["hover:text-primary-dark", "dark:hover:text-primary-light"],
      link: ["underline", "hover:text-primary-dark", "dark:hover:text-primary-light"]
    },
    size: {
      icon: ["size-8"],
      small: ["h-8", "px-3", "rounded-sm", "text-xs"],
      medium: ["px-4", "py-2", "text-base"],
      extended: ["w-full"]
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "medium"
  }
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>
}

export function Button({variant, size, className, asChild = false, ref, ...props}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({variant, size}), className)} ref={ref} {...props}/>
};

Button.displayName = "Button";