import classes from "./Button.module.css"
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import {cn} from "../../../utils/utils";

export const buttonVariants = cva(classes.button, {
  variants: {
    variant: {
      primary: classes.primary,
      ghost: classes.ghost,
      link: classes.link
    },
    size: {
      icon: [""],
      small: [""],
      standard: ["text-base"],
      extended: [""]
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "standard"
  }
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>
}

export function Button({variant, size, className, asChild = false, ref, ...props}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({variant, size, className}))} ref={ref} {...props}/>
};

Button.displayName = "Button";