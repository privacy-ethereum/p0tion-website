"use client";

import { AttributeCard } from "@/app/components/AttributeCard";
import { AppContent } from "@/app/components/layouts/AppContent";
import { Card } from "@/app/components/ui/Card";
import { Chip } from "@/app/components/ui/Chip";
import { Tabs } from "@/app/components/ui/Tabs";
import Image from "next/image";
import { useParams } from "next/navigation";
import { CeremonyDate } from "@/app/components/CeremonyDate";
import { Button } from "@/app/components/ui/Button";
import { LiveStatsSection } from "@/app/sections/ceremonies/LiveStatsSection";
import { ContributionsSection } from "@/app/sections/ceremonies/ContributionsSection";
import { AboutSection } from "@/app/sections/ceremonies/AboutSection";
import { DownloadZkeySection } from "@/app/sections/ceremonies/DownloadZkeySection";
import { useGetCeremonyByPrefix } from "@/app/hooks/useGetCeremonyData";
import { CeremonyData, CeremonyState } from "@/app/types";
import { SkeletonWrapper } from "@/app/components/layouts/SkeletonWrapper";
import { cn } from "@/app/lib/utils";

const CeremonyOverview = ({
  isLoading,
  ceremony,
  className,
}: {
  isLoading: boolean;
  ceremony: CeremonyData | undefined;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <Card className="bg-yellow" radius="md">
        <div className="grid grid-cols-3 lg:flex lg:flex-col">
          <AttributeCard
            title="Total participants"
            value="400"
            isLoading={isLoading}
          />
          <AttributeCard
            title="People in the queue"
            value="368"
            removeBorderBottom
            isLoading={isLoading}
          />
          <AttributeCard
            title="Penalty"
            value={ceremony?.penalty ?? "N/A"}
            removeBorderBottom
            isLoading={isLoading}
          />
        </div>
      </Card>
      <Image
        src="/illustrations/attributes.svg"
        alt="Attributes illustration"
        width={240}
        height={70}
        className="w-[120px] h-[35px] lg:w-[240px] lg:h-[70px]"
      />
    </div>
  );
};

export default function ProjectPage() {
  const { slug } = useParams();
  const { data: ceremony, isLoading } = useGetCeremonyByPrefix(slug as string);

  return (
    <AppContent
      containerClassName="bg-light-base py-10 lg:py-[140px]"
      className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10"
    >
      <CeremonyOverview
        isLoading={isLoading}
        ceremony={ceremony}
        className="lg:h-[calc(100vh-280px)] lg:flex hidden"
      />
      <div className="flex flex-col gap-10 lg:gap-[60px]">
        <div className="flex flex-col col gap-6">
          <div className="flex items-center justify-between">
            <SkeletonWrapper
              isLoading={isLoading}
              placeholder={
                <Chip className="!bg-slate-300 animate-pulse !h-[30px] w-[94px] border-[0]" />
              }
            >
              {ceremony?.state === CeremonyState.OPENED && (
                <Chip withDot dotColor="green">
                  Open
                </Chip>
              )}
              {ceremony?.state === CeremonyState.FINALIZED && (
                <Chip variant="gray">Closed</Chip>
              )}
            </SkeletonWrapper>
            <SkeletonWrapper
              isLoading={isLoading}
              placeholder={
                <div className="w-[300px] h-[16px] bg-slate-300 animate-pulse "></div>
              }
            >
              <CeremonyDate
                startDate={ceremony?.startDate}
                endDate={ceremony?.endDate}
                className="text-right"
              />
            </SkeletonWrapper>
          </div>
          <div className="flex flex-col gap-5">
            <SkeletonWrapper
              isLoading={isLoading}
              placeholder={
                <div className="w-3/4 h-[50px] bg-slate-300 animate-pulse"></div>
              }
            >
              <h1 className="text-black text-2xl lg:text-4xl leading-[28px] lg:leading-[50px] font-medium">
                {ceremony?.title}
              </h1>
            </SkeletonWrapper>
            <div className="flex flex-col gap-6">
              <SkeletonWrapper
                isLoading={isLoading}
                placeholder={
                  <div className="w-full h-[16px] bg-slate-300 animate-pulse"></div>
                }
              >
                {ceremony?.description && (
                  <span className="text-black text-base font-normal">
                    {ceremony?.description}
                  </span>
                )}
              </SkeletonWrapper>

              <CeremonyOverview
                isLoading={isLoading}
                ceremony={ceremony}
                className="lg:hidden block"
              />

              <div className="border-b border-black lg:my-5"></div>
              <div className="flex flex-col gap-6 ">
                <div className="flex flex-col">
                  <span className="text-black text-base font-normal">
                    Press contribute to join the ceremony
                  </span>
                  <span className="text-gray italic text-sm font-normal">
                    *If contributing on your phone, please do not leave the
                    current browser tab.
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row gap-4">
                  <Button variant="black" className="uppercase">
                    Contribute on Browser
                  </Button>
                  <Button variant="black" className="uppercase">
                    Contribute with CLI{" "}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Tabs
          items={[
            {
              id: "live-stats",
              title: "Live Stats",
              content: <LiveStatsSection id={ceremony?.prefix ?? ""} />,
            },
            {
              id: "contributions",
              title: "Contributions",
              content: <ContributionsSection id={ceremony?.prefix ?? ""} />,
            },
            {
              id: "about",
              title: "About",
              content: null,
            },
            {
              id: "download-zkey",
              title: "Download ZKey",
              content: <DownloadZkeySection id={ceremony?.prefix ?? ""} />,
            },
          ]}
        />
      </div>
    </AppContent>
  );
}
