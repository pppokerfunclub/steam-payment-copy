import React, { forwardRef } from "react";
import { cn } from "@/shared";
import { Input } from "../ui/input";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  placeholder?: string;
  tip?: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, Props>(
  ({ className, label, placeholder, tip, error, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        {label && <p className="text-sm">{label}</p>}
        <Input
          placeholder={placeholder}
          {...props}
          ref={ref}
          className={cn(
            error && "border-red-500 focus:border-red-500",
            className
          )}
        />
        {error && <p className="!text-xs text-red-500">{error}</p>}
        {tip && !error && <p className="!text-xs text-white/30">{tip}</p>}
      </div>
    );
  }
);
