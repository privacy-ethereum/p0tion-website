import { Icons } from "./shared/Icons";
import { Card } from "./ui/Card";
import { Chip } from "./ui/Chip";
import { CeremonyDate } from "./CeremonyDate";
import { CeremonyState } from "../types";

interface CeremonyCardProps {
  title: string;
  description?: string;
  startDate?: string | number;
  endDate?: string | number;
  status?: CeremonyState;
}

export const CeremonyCard = ({
  title,
  description,
  startDate,
  endDate,
  status,
}: CeremonyCardProps) => {
  const isActive = status === CeremonyState.OPENED;
  return (
    <Card
      variant="secondary"
      radius="xs"
      size="md"
      className="cursor-pointer h-full"
    >
      <div className="flex flex-col gap-6 lg:gap-14">
        <div className="flex flex-col gap-[14px] items-start">
          {isActive ? (
            <Chip withDot dotColor="green">
              Open
            </Chip>
          ) : (
            <Chip variant="gray" className="!capitalize">{status?.toLowerCase()}</Chip>
          )}
          <span className="text-xl lg:text-2xl font-medium text-black">{title}</span>
        </div>
        <div className="flex flex-col gap-[14px]">
          <span className="text-base text-black font-normal line-clamp-2 h-12">
            {description}
          </span>
          <CeremonyDate startDate={startDate} endDate={endDate} />
        </div>
      </div>
    </Card>
  );
};
