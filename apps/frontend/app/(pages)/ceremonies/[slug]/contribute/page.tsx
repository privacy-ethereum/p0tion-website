"use client";

import { AppContent } from "@/app/components/layouts/AppContent";
import { ContributeFlowerSteps } from "@/app/components/shared/ContributeFlowerSteps";
import { Icons } from "@/app/components/shared/Icons";
import { Card } from "@/app/components/ui/Card";
import { LoadingSpinner } from "@/app/components/ui/LoadingSpinner";
import { useGetCeremonyByPrefix } from "@/app/hooks/useGetCeremonyData";
import { ContributionCompleted } from "@/app/sections/ceremonies/ContributionCompleted";
import { useParams } from "next/navigation";

export default function ContributePage() {
  const { slug } = useParams();
  const { data: ceremony, isLoading } = useGetCeremonyByPrefix(slug as string);

  const steps = {
    1: { loading: false, done: true, currentCircuit: 5, totalCircuits: 32 },
    2: { loading: false, done: true, currentCircuit: 10, totalCircuits: 32 },
    3: { loading: true, done: true, currentCircuit: 10, totalCircuits: 32 },
    4: { loading: false, done: true, currentCircuit: 10, totalCircuits: 32 },
    5: { loading: true, done: false, currentCircuit: 10, totalCircuits: 32 },
    6: { loading: false, done: false, currentCircuit: 10, totalCircuits: 32 },
  }

  const currentStep = 3;

  const circuits = steps[currentStep].totalCircuits;
  const currentCircuitStep = steps[currentStep].currentCircuit;
  const currentCircuitPercentage = currentCircuitStep / circuits * 100;
  const ceremonyCompleted = true;

  if (ceremonyCompleted) {
    return (
      <ContributionCompleted
        name={ceremony?.title ?? "N/A"}
        isLoading={isLoading}
      />
    );
  }

  return (
    <div className="bg-light-base">
      <AppContent className="py-10 lg:py-[140px]">
        <div className="container">
          <div className="flex flex-col gap-14">
            <ContributeFlowerSteps
              className="mx-auto"
              steps={steps}
            />
            <div className="flex flex-col gap-4 items-center justify-center mx-auto">
              <h1 className="text-lg lg:text-3xl text-center font-medium">
                Verifying contribution
              </h1>
              <LoadingSpinner percentage={currentCircuitPercentage} />
            </div>
            <div className="h-[1px] bg-black w-full"></div>
            <div className="flex flex-col mx-auto gap-14">
              <Card variant="secondary" radius="xxs" className="w-full max-w-[260px] mx-auto">
                <div className="flex flex-col text-center">
                  <span className="text-xl lg:text-[28px] font-bold font-poppins text-black">
                    {currentCircuitStep}
                  </span>
                  <span className="text-base font-poppins text-black">
                    {`of ${circuits} circuits completed`}
                  </span>
                </div>
              </Card>
              <div className="flex gap-0.5 items-center justify-center">
                <Icons.Info />
                <span className="text-sm text-[#3B6FFF] italic font-medium">
                  Please do not leave the current browser tab.
                </span>
              </div>
            </div>
          </div>
        </div>
      </AppContent>
    </div>
  );
}
