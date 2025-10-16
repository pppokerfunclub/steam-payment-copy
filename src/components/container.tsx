import React, { PropsWithChildren } from "react";
import { cn } from "@/shared";

interface Props {
  className?: string;
}

export const Container = ({
  className,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div
      className={cn("max-w-[1000px] mx-auto w-[calc(100%-24px)]", className)}
    >
      {children}
    </div>
  );
};
