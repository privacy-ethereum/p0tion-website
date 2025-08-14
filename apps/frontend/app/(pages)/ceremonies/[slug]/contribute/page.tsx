"use client";

import { AppContent } from "@/app/components/layouts/AppContent";
import { ContributeFlowerSteps } from "@/app/components/shared/ContributeFlowerSteps";
import { Icons } from "@/app/components/shared/Icons";
import { LoadingSpinner } from "@/app/components/ui/LoadingSpinner";
import { useGetCeremonyByPrefix } from "@/app/hooks/useGetCeremonyData";
import { ContributionCompleted } from "@/app/sections/ceremonies/ContributionCompleted";
import { useParams } from "next/navigation";

export default function ContributePage() {
  const { slug } = useParams();
  const { data: ceremony, isLoading } = useGetCeremonyByPrefix(slug as string);

  const ceremonyCompleted = false;

  if (ceremonyCompleted) {
    return (
      <ContributionCompleted
        name={ceremony?.title ?? "N/A"}
        isLoading={isLoading}
      />
    );
  }

  return (
    <AppContent className="py-10 lg:py-[140px]">
      <div className="container">
        <div className="flex flex-col gap-14">
          <ContributeFlowerSteps
            className="mx-auto"
            steps={{
              1: { loading: false, done: true },
              2: { loading: false, done: true },
              3: { loading: false, done: true },
              4: { loading: true, done: false },
              5: { loading: false, done: false },
              6: { loading: false, done: false },
            }}
          />
          <div className="flex flex-col gap-4 items-center justify-center mx-auto">
            <h1 className="text-lg lg:text-3xl text-center font-medium">
              Verifying contribution
            </h1>
            <LoadingSpinner percentage={20} />
          </div>
          <div className="h-[1px] bg-black w-full"></div>
          <div className="flex gap-0.5 items-center justify-center">
            <Icons.Info />
            <span className="text-sm text-[#3B6FFF] italic font-medium">
              Please do not leave the current browser tab.
            </span>
          </div>
        </div>
      </div>
    </AppContent>
  );
}
