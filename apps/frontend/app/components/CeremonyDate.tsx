import { Icons } from "./shared/Icons";
import { cn } from "../lib/utils";

interface CeremonyDateProps {
  startDate?: string | number;
  endDate?: string | number;
  className?: string;
}

export const CeremonyDate = ({
  startDate,
  endDate,
  className,
}: CeremonyDateProps) => {
  const formattedStartDate = startDate
    ? new Date(Number(startDate)).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const formattedEndDate = endDate
    ? new Date(Number(endDate)).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      })
    : "";

  if (!startDate && !endDate) return null;

  return (
    <span
      className={cn(
        "flex lg:flex-row flex-col lg:items-center gap-0.5 lg:gap-1 text-[#888] font-normal text-xs lg:mt-auto",
        className
      )}
    >
      {startDate && (
        <>
          <span>{`Start date: ${formattedStartDate}`}</span>
          <Icons.Dot className="hidden lg:block" />
        </>
      )}
      {formattedEndDate && (
        <>
          <span>{`Finish date: ${formattedEndDate}`}</span>
        </>
      )}
    </span>
  );
};
