import classes from "./Form.module.css"
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import {cn} from "../../../utils/utils";

export const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      classes.checkbox,
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(classes.checkboxIndicator)}
    >
      <Check/>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))

Checkbox.displayName = CheckboxPrimitive.Root.displayName