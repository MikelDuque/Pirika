import { ReactElement, Ref } from "react";

/* ----- Slot ----- */
interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export declare const Slot: (props: SlotProps & { ref?: Ref<HTMLElement> }) => ReactElement | null;