import { ComponentProps } from "react";
import { Input } from "./Input";
import { Label } from "./Label";

export default function InputWLabel({children, ...props}: ComponentProps<typeof Input>) {
  return (
    <div className="flex gap-1">
      <Label>{children}</Label>
      <Input {...props}/>
    </div>
  )
}