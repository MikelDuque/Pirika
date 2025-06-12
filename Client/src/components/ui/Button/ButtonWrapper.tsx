import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { Button, ButtonProps } from "./Button";
import { cn } from "../../../utils/utils";

interface buttonWrapperProps extends ButtonProps {
  icon?: IconName,
  invertPosition?: boolean
}

export default function ButtonWithIcons({icon, invertPosition, children, ...props}: buttonWrapperProps) {
  return (
    <Button {...props} className={cn("flex gap-2", invertPosition && "flex-row-reverse", props.className)}>
      {icon && <DynamicIcon name={icon} className="fit-content"/>}
      {children}
    </Button>
  );
};