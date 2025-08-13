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
}: {
  title: string;
  value: ReactNode;
  removeBorderBottom?: boolean;
  removeBorderLeft?: boolean;
  size?: "sm" | "md";
  isLoading?: boolean;
  className?: string;
}) => {
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
          <AttributeValue size={size}>{value}</AttributeValue>
        )}
      </div>
    </Card>
  );
};
