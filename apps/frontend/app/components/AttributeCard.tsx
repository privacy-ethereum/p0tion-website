import { classed } from "@tw-classed/react";
import { cn } from "../lib/utils";
import { Card } from "./ui/Card";
import { ReactNode } from "react";

const AttributeValue = classed.span("text-black font-medium", {
  variants: {
    size: {
      sm: "text-lg lg:text-[22px]",
      md: "text-xl lg:text-3xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const AttributeCard = ({
  title,
  value,
  removeBorderBottom = false,
  removeBorderLeft = false,
  size = "md",
  isLoading = false,
  className,
  timeInMinutes = false,
}: {
  title: string;
  value: ReactNode;
  removeBorderBottom?: boolean;
  removeBorderLeft?: boolean;
  size?: "sm" | "md";
  isLoading?: boolean;
  className?: string;
  timeInMinutes?: boolean;
}) => {
  const formatTime = (val: ReactNode): ReactNode => {
    if (!timeInMinutes || typeof val !== 'number') return val;
    
    if (val > 60) {
      const minutes = Math.floor(val / 60);
      const seconds = val % 60;
      return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
    }
    
    return `${val}s`;
  };

  const displayValue = formatTime(value);
  return (
    <Card
      variant="secondary"
      className={cn(className, "flex-1", {
        "-mt-0.5": removeBorderBottom,
        "-ml-0.5": removeBorderLeft,
      })}
      radius="xs"
    >
      <div className="flex flex-col gap-2 lg:gap-[18px]">
        <span className="text-[#888] text-sm font-normal line-clamp-1 lg:line-clamp-none">{title}</span>
        {isLoading ? (
          <div
            className={cn("w-1/2 bg-slate-200 rounded-sm animate-pulse", {
              "h-[40px]": size === "sm",
              "h-[28px]": size === "md",
            })}
          />
        ) : (
          <AttributeValue size={size}>{displayValue}</AttributeValue>
        )}
      </div>
    </Card>
  );
};
