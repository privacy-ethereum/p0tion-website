"use client";

import { SkeletonWrapper } from "@/app/components/layouts/SkeletonWrapper";
import { Card } from "@/app/components/ui/Card";
import {
  useGetCeremonyContributions,
  useGetCeremonyStats,
} from "@/app/hooks/useGetCeremonyData";
import { shortAddress } from "@/app/lib/utils";
import { classed } from "@tw-classed/react";

const TableWrapper = classed.div(
  "grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_200px] gap-4 lg:gap-2"
);
const TableHeader = classed.span("text-sm lg:text-lg text-black uppercase font-bold");

export const ContributionsSection = ({ id }: { id: string }) => {
  const { data: contributions = [], isLoading: isLoadingContributions } =
    useGetCeremonyContributions(id);

  const formatDate = (date: string) => {
    return new Date(date)
      .toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
      .replace(",", " -");
  };

  const TableLabels = [
    {
      label: "Doc",
      key: "doc",
    },
    {
      label: "Contributor",
      key: "contributor",
    },
    {
      label: "Contribution Date",
      key: "lastUpdated",
    },
    {
      label: "Hash",
      key: "lastZkeyBlake2bHash",
    },
  ];

  return (
    <Card radius="xs" size="sm">
      <div className="flex flex-col gap-4">
        <TableWrapper className="hidden lg:flex">
          {TableLabels?.map((label) => (
            <TableHeader key={label.key}>{label.label}</TableHeader>
          ))}
        </TableWrapper>
        <div className="flex flex-col gap-[14px]">
          <SkeletonWrapper
            isLoading={isLoadingContributions}
            items={10}
            placeholder={
              <div className="w-full bg-slate-300 animate-pulse rounded-[10px] border-[0] h-10"></div>
            }
          >
            {contributions?.map((contributor: any, index) => (
              <Card key={index} variant="secondary" radius="xxs" size="xxs">
                <TableWrapper key={contributor.id}>
                  <div className="flex flex-col gap-1">
                    <TableHeader>{TableLabels[0].label}</TableHeader>
                    <span className="text-sm text-black">
                      {shortAddress(contributor?.doc)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <TableHeader>{TableLabels[1].label}</TableHeader>
                    <span className="text-sm text-black">
                      N/A
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <TableHeader>{TableLabels[2].label}</TableHeader>
                    <span className="text-sm text-black">
                      {formatDate(contributor?.lastUpdated)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <TableHeader>{TableLabels[3].label}</TableHeader>
                    <span className="text-sm text-black">
                      {shortAddress(contributor?.lastZkeyBlake2bHash)}
                    </span>
                  </div>
                </TableWrapper>
              </Card>
            ))}
          </SkeletonWrapper>
        </div>
      </div>
    </Card>
  );
};
