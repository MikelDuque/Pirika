import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { Button, ButtonProps } from "./Button";
import { cn } from "../../../utils/utils";

interface buttonWrapperProps extends ButtonProps {
  icon?: IconName,
  invertPosition?: boolean,
  childen?: React.ReactNode
}

export default function ButtonWithIcons({icon, invertPosition, children, ...rest}: buttonWrapperProps) {
  return (
    <Button {...rest} className={cn("flex gap-2", invertPosition && "flex-row-reverse")}>
      {icon && <DynamicIcon name={icon}/>}
      {children}
    </Button>
  );
};