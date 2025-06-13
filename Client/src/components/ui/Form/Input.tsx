import classes from "./Form.module.css";
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../../utils/utils"

const inputVariants = cva([classes.input, "placeholder:text-foreground/75 dark:placeholder:text-dark-foreground/75"], {
  variants: {
    variant: {
      default: [classes.default, "bg-gray-light dark:bg-gray-dark"],
      error: classes.error,
      ghost: [classes.ghost, "border-transparent"]
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input"> & VariantProps<typeof inputVariants>>(
  ({type, className, ...props}, ref) => (
    <input type={type} className={cn(inputVariants({variant: props.variant}), className)} ref={ref} {...props}/>
));

Input.displayName = "Input";