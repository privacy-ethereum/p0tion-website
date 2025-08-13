import { cn } from "@/app/lib/utils";
import { classed } from "@tw-classed/react";

const CardBase = classed.div("shadow-border", {
  variants: {
    variant: {
      primary: "bg-yellow-card",
      secondary: "bg-white",
    },
    radius: {
      xxs: "rounded-[10px]",
      xs: "rounded-[20px]",
      sm: "rounded-[25px]",
      md: "rounded-[35px]",
    },
    disabled: {
      true: "opacity-50 pointer-events-none",
    },
    withHover: {
      true: "hover:bg-yellow-card hover:cursor-pointer",
    },
  },
  defaultVariants: {
    variant: "primary",
    radius: "md",
  },
});

const CardTitle = classed.h3("text-black font-normal font-poppins", {
  variants: {
    size: {
      xxs: "text-[16px]",
      sm: "text-[22px]",
      md: "text-2xl lg:text-[48px] lg:leading-[47px] font-medium",
      lg: "text-3xl lg:text-[60px] lg:leading-[47px] font-medium",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const CardPadding = classed.div("", {
  variants: {
    size: {
      xxs: "p-2 lg:p-[10px]",
      sm: "p-4 lg:p-[18px]",
      md: "p-4 lg:p-5",
      lg: "p-6 lg:p-10",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface CardProps {
  title?: string;
  titleClassName?: string;
  actions?: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "xxs" | "sm" | "md" | "lg";
  withDivider?: boolean;
  children?: React.ReactNode;
  radius?: "xxs" | "xs" | "sm" | "md";
  className?: string;
  contentClassName?: string;
  disabled?: boolean;
  withHover?: boolean;
}

export const Card = ({
  title,
  titleClassName,
  actions,
  variant = "primary",
  size = "md",
  withDivider = false,
  children,
  radius = "md",
  className,
  contentClassName = "",
  disabled = false,
  withHover = false,
}: CardProps) => {
  return (
    <CardBase
      variant={variant}
      radius={radius}
      disabled={disabled}
      withHover={withHover}
      className={className}
    >
      {title && (
        <CardPadding
          className={cn(
            "flex items-center justify-between",
            withDivider && "border-b border-black",
            contentClassName
          )}
          size={size}
        >
          <CardTitle size={size} className={titleClassName}>
            {title}
          </CardTitle>
          {actions}
        </CardPadding>
      )}
      <CardPadding size={size} className={contentClassName}>{children}</CardPadding>
    </CardBase>
  );
};
