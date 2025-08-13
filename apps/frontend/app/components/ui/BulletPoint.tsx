"use client";

import { classed, VariantProps } from "@tw-classed/react";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const BulletPointComponent = classed.div("flex flex-col gap-2", {
  variants: {
    variant: {
      default: "text-black",
      light: "text-secondary-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const BulletTitle = classed.div(
  "flex items-center gap-6",
  "font-poppins text-xl lg:text-[28px] leading-[28px] lg:leading-[36px] font-semibold tracking-[-0.28px]"
);

const BulletCircle = classed.div(
  "size-[32px] lg:size-[48px] rounded-full border-2 border-current flex items-center justify-center"
);

const BulletDescription = classed.p("text-base lg:text-lg font-normal");

interface BulletPointProps extends VariantProps<typeof BulletPointComponent> {
  title: string;
  description: string;
  className?: string;
}

const BulletPoint = forwardRef<HTMLDivElement, BulletPointProps>(
  ({ title, description, variant, className }, ref) => {
    return (
      <div className="grid grid-cols-[32px_1fr] lg:grid-cols-[48px_1fr] gap-2 lg:gap-4">
        <BulletCircle />
        <BulletPointComponent
          ref={ref}
          className={cn(className)}
          variant={variant}
        >
          <BulletTitle>{title}</BulletTitle>
          <BulletDescription>{description}</BulletDescription>
        </BulletPointComponent>
      </div>
    );
  }
);

BulletPoint.displayName = "BulletPoint";

export { BulletPoint };
