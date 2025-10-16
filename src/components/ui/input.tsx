import * as React from "react";

import { cn } from "@/shared";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border border-[#303940] px-3 h-10 text-sm font-medium placeholder:text-white/55 rounded-lg outline-none",
        className
      )}
      {...props}
    />
  );
}

export { Input };
