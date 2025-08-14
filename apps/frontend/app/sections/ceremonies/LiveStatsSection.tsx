import { AttributeCard } from "@/app/components/AttributeCard";
import { SkeletonWrapper } from "@/app/components/layouts/SkeletonWrapper";
import { Card } from "@/app/components/ui/Card";
import { useGetCeremonyStats } from "@/app/hooks/useGetCeremonyData";

export const LiveStatsSection = ({ id }: { id: string }) => {
  const { data: liveStats = [], isLoading: isLoadingLiveCeremony } =
    useGetCeremonyStats(id);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <SkeletonWrapper
        isLoading={isLoadingLiveCeremony}
        items={4}
        placeholder={
          <div className="w-full bg-slate-300 animate-pulse rounded-[25px] aspect-video border-[0] border-black"></div>
        }
      >
        {liveStats?.map((stat: any, index) => (
          <Card
            key={index}
            title={stat?.name}
            size="sm"
            titleClassName="!font-medium"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 -mt-[18px]">
              <AttributeCard
                removeBorderLeft
                size="sm"
                title="Completed"
                value={stat?.completedContributions ?? 0}
              />
              <AttributeCard
                removeBorderLeft
                size="sm"
                title="Memory Required"
                value={`${stat?.memoryRequirement ?? "N/A"} mb`}
              />
              <AttributeCard
                removeBorderBottom
                size="sm"
                title="Avg Contribution Time"
                value={stat?.avgTimingContribution ?? 0}
                timeInMinutes
              />
              <AttributeCard
                removeBorderBottom
                removeBorderLeft
                size="sm"
                title="Max Contribution Time"
                value={stat?.maxTiming ?? 0}
                timeInMinutes
              />
            </div>
          </Card>
        ))}
      </SkeletonWrapper>
    </div>
  );
};
