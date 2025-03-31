import classes from "./Form.module.css"
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../../utils/utils"

const labelVariants = cva(classes.label, {
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

export const Label = React.forwardRef<React.ComponentRef<typeof LabelPrimitive.Root>, React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>>(
  ({ className, ...props }, ref) => (
    <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props}/>
));

Label.displayName = LabelPrimitive.Root.displayName