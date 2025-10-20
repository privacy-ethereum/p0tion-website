"use client";

import Image from "next/image";
import { AppContent } from "@/app/components/layouts/AppContent";
import { Card } from "@/app/components/ui/Card";
import { Icons } from "@/app/components/shared/Icons";
import { CeremonyCard } from "@/app/components/CeremonyCard";
import { useGetCeremonies } from "@/app/hooks/useGetCeremonyData";
import { useState } from "react";
import { Button } from "@/app/components/ui/Button";
import { MAX_CLOSED_CEREMONIES_WITHOUT_EXPAND } from "@/app/config";
import Link from "next/link";
import { CeremonyData, CeremonyState } from "@/app/types";
import { cn } from "@/app/lib/utils";
import { SkeletonWrapper } from "@/app/components/layouts/SkeletonWrapper";

const CeremonyCardPlaceholder = () => {
  return (
    <div className="w-full bg-slate-300 animate-pulse rounded-[20px] aspect-video border-[0]"></div>
  );
};

export const CeremoniesSection = () => {
  const [showAllClosedExpanded, setShowAllClosedExpanded] = useState(false);
  const {
    data: { ceremonies: openCeremonies = [] } = { ceremonies: [] },
    isLoading: isLoadingOpenCeremonies,
  } = useGetCeremonies({
    status: [CeremonyState.OPENED],
  });

  const {
    data: { ceremonies: closedCeremonies = [] } = { ceremonies: [] },
    isLoading: isLoadingClosedCeremonies,
  } = useGetCeremonies({
    status: [CeremonyState.FINALIZED, CeremonyState.CLOSED],
  });

  const showAllClosedCeremonies =
    closedCeremonies.length > MAX_CLOSED_CEREMONIES_WITHOUT_EXPAND &&
    showAllClosedExpanded;

  const filteredClosedCeremonies = showAllClosedCeremonies
    ? closedCeremonies
    : closedCeremonies.slice(0, MAX_CLOSED_CEREMONIES_WITHOUT_EXPAND);

  const showOpenCeremonies =
    openCeremonies.length > 0 && !isLoadingOpenCeremonies;
  const showClosedCeremonies =
    closedCeremonies.length > MAX_CLOSED_CEREMONIES_WITHOUT_EXPAND &&
    !isLoadingClosedCeremonies;

  return (
    <div className="bg-light-base">
      <AppContent className="flex flex-col gap-10 lg:gap-14 py-10 lg:py-[120px]">
        <Card
          title="Open ceremonies"
          actions={<Icons.ActiveCeremonies />}
          radius="sm"
          size="lg"
          withDivider
        >
          <div className="grid grid-cols-1 gap-5 lg:gap-[30px] lg:grid-cols-2">
            <SkeletonWrapper
              isLoading={isLoadingOpenCeremonies}
              items={2}
              placeholder={<CeremonyCardPlaceholder />}
            >
              {openCeremonies?.length == 0 ? (
                <>
                  <span className="text-black text-base font-normal">
                    No open ceremonies
                  </span>
                </>
              ) : (
                openCeremonies?.map((ceremony: CeremonyData) => {
                  console.log("ceremony", ceremony);
                  return (
                    <Link
                      href={`/ceremonies/${ceremony.prefix}`}
                      key={ceremony.uid}
                    >
                      <CeremonyCard
                        key={ceremony.uid}
                        title={ceremony.title}
                        description={ceremony.description}
                        startDate={ceremony.startDate.toString()}
                        endDate={ceremony.endDate.toString()}
                        status={ceremony.state}
                      />
                    </Link>
                  );
                })
              )}
            </SkeletonWrapper>
          </div>
        </Card>
        <Card
          title="Closed ceremonies"
          actions={<Icons.ClosedCeremonies />}
          contentClassName="!p-6 lg:!p-10"
          radius="sm"
          withDivider
        >
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-1 gap-5 lg:gap-[30px] lg:grid-cols-3">
              <SkeletonWrapper
                isLoading={isLoadingClosedCeremonies}
                placeholder={<CeremonyCardPlaceholder />}
                items={6}
              >
                {filteredClosedCeremonies?.map((ceremony: CeremonyData) => (
                  <Link
                    href={`/ceremonies/${ceremony.prefix}`}
                    key={ceremony.uid}
                  >
                    <CeremonyCard
                      key={ceremony.uid}
                      title={ceremony.title}
                      description={ceremony.description}
                      startDate={ceremony.startDate.toString()}
                      endDate={ceremony.endDate.toString()}
                      status={ceremony.state}
                    />
                  </Link>
                ))}
              </SkeletonWrapper>
            </div>
            {showClosedCeremonies && (
              <Button
                className="uppercase mx-auto"
                variant="black"
                icon={
                  <Icons.ArrowDown
                    className={cn(
                      showAllClosedExpanded ? "rotate-180" : "rotate-0"
                    )}
                  />
                }
                iconPosition="right"
                onClick={() => setShowAllClosedExpanded(!showAllClosedExpanded)}
              >
                {showAllClosedExpanded ? "Show less" : "Show more"}
              </Button>
            )}
          </div>
        </Card>
        <Image
          src="/illustrations/double-circle.svg"
          alt="double circle"
          width={200}
          height={100}
        />
      </AppContent>
    </div>
  );
};
