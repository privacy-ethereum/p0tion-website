import { AttributeCard } from "@/app/components/AttributeCard";
import { SkeletonWrapper } from "@/app/components/layouts/SkeletonWrapper";
import { Card } from "@/app/components/ui/Card";
import { parseRepoRoot, truncateString } from "@/app/helpers/utils";
import { useGetCeremonyStats } from "@/app/hooks/useGetCeremonyData";
import { shortAddress } from "@/app/lib/utils";
import Link from "next/link";

export const AboutSection = ({ id }: { id: string }) => {
  const { data: ceremonyStats, isLoading } = useGetCeremonyStats(id as string);

  

  return (
    <div className="flex flex-col gap-5">
      <SkeletonWrapper
        isLoading={isLoading}
        placeholder={
          <>
            <div className="w-full h-[250px] bg-slate-300 animate-pulse rounded-md" />
            <div className="w-full h-[250px] bg-slate-300 animate-pulse rounded-md" />
            <div className="w-full h-[250px] bg-slate-300 animate-pulse rounded-md" />
          </>
        }
      >
        {ceremonyStats?.map((circuit, index) => {
          const circuitParams =
            circuit?.template?.paramsConfiguration &&
            circuit?.template?.paramsConfiguration?.length > 0
              ? circuit?.template?.paramsConfiguration?.join(" ")
              : circuit?.template?.paramConfiguration &&
                  circuit?.template?.paramConfiguration?.length > 0
                ? circuit?.template?.paramConfiguration?.join(" ")
                : "No parameters";


                console.log("circuit", circuit)
          return (
            <Card
              key={index}
              size="sm"
              title={`${circuit.name} - ${circuit.description}`}
              titleClassName="!font-medium"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 -mt-[18px]">
                <AttributeCard
                  title="Parameters"
                  value={`${circuitParams}`}
                  size="sm"
                />
                <AttributeCard
                  title="Commit Hash"
                  value={
                    <Link
                      target="_blank"
                      href={`${parseRepoRoot(circuit.template.source)}/tree/${circuit.template.commitHash}`}
                      rel="noreferrer noopener"
                      className="underline hover:scale-105 transition-all duration-300"
                    >
                      {truncateString(circuit?.template?.commitHash ?? "", 6)}
                    </Link>
                  }
                  removeBorderLeft
                  size="sm"
                />
                <AttributeCard
                  className="col-span-2"
                  title="Template Link"
                  value={
                    <Link
                      target="_blank"
                      rel="noreferrer noopener"
                      href={circuit.template.source}
                      className="underline hover:text-primary"
                    >
                      {truncateString(circuit.template.source, 16)}
                    </Link>
                  }
                  removeBorderBottom
                  size="sm"
                />
              </div>
            </Card>
          );
        })}
      </SkeletonWrapper>
    </div>
  );
};
