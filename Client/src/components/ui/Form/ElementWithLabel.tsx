import { Input } from "./Input";
import { Label } from "./Label";

interface InputWrapperProps extends React.ComponentProps<typeof Input> {

}

export default function InputWLabel({children, ...props}: InputWrapperProps) {
  return (
    <div className="flex gap-1">
      <Label>{children}</Label>
      <Input {...props}/>
    </div>
  )
}