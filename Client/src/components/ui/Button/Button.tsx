import { cva, type VariantProps } from "class-variance-authority";
import {cn} from "../../../utils/utils";
import React from "react";
import { Slot } from "../../../utils/slot.mjs";

const buttonVariants = cva("button", {
  variants: {
    variant: {
      primary: "primary",
      ghost: "ghost",
      link: "link"
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

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>
}

export default function Button({variant, size, className, asChild = false, ref, ...props}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({variant, size, className}))} ref={ref} {...props}/>
};

Button.displayName = "Button";