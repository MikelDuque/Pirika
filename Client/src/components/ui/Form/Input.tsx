import classes from "./Form.module.css";
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../../utils/utils"

const inputVariants = cva([classes.input], {
  variants: {
    variant: {
      default: classes.default,
      error: classes.error
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input"> & VariantProps<typeof inputVariants>>(
  ({type, className, ...props}, ref) => (
    <input type={type} className={cn(inputVariants({className}))} ref={ref} {...props}/>
));

Input.displayName = "Input";