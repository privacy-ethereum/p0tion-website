import { Card } from "@/app/components/ui/Card";
import { Icons } from "@/app/components/shared/Icons";
import { Button } from "@/app/components/ui/Button";
import {
  useGetCeremonyArtifacts,
  useGetCeremonyByPrefix,
} from "@/app/hooks/useGetCeremonyData";
import { cn, shortAddress } from "@/app/lib/utils";
import { CeremonyState } from "@/app/types";
import Link from "next/link";
import { SkeletonWrapper } from "@/app/components/layouts/SkeletonWrapper";

export const DownloadZkeySection = ({ id }: { id: string }) => {
  const {
    data: { finalZkeys, lastZkeys, beaconValue, beaconHash } = {},
    isLoading: isLoadingArtifacts,
    isFetching: isFetchingArtifacts,
  } = useGetCeremonyArtifacts(id);
  const { data: ceremony, isLoading: isLoadingCeremony } =
    useGetCeremonyByPrefix(id);

  const isFinalized = ceremony?.state === CeremonyState.FINALIZED;

  const showFinalContributionBeacon =
    isLoadingArtifacts || isFetchingArtifacts || (beaconHash && beaconValue);

  return (
    <div className="flex flex-col gap-10 lg:gap-14">
      {showFinalContributionBeacon && (
        <div className="flex flex-col gap-3 lg:gap-6">
          <span className="text-[22px] font-medium leading-[28px] text-black">
            Final Contribution Beacon
          </span>
          <div className="flex flex-col gap-2 lg:gap-5">
            <Card variant="secondary" size="xxs" className="!-p-2 lg:!p-3 lg:w-3/4">
              <div className="flex justify-between items-center">
                <SkeletonWrapper
                  isLoading={isLoadingArtifacts}
                  placeholder={
                    <div className="flex bg-slate-300 animate-pulse h-[16px] w-full min-w-[220px] max-w-[340px]"></div>
                  }
                >
                  <span className="font-roboto-mono text-sm text-black">
                    {`Beacon ${beaconValue}`}
                  </span>
                </SkeletonWrapper>
                <Button variant="yellow" size="xs" fontWeight="regular">
                  copy
                </Button>
              </div>
            </Card>

            <Card variant="secondary" size="xxs" className="!-p-2 lg:!p-3 lg:w-1/2">
              <div className="flex justify-between items-center">
                <SkeletonWrapper
                  isLoading={isLoadingArtifacts}
                  placeholder={
                    <div className="flex bg-slate-300 animate-pulse h-[16px] w-full min-w-[150px] max-w-[200px]"></div>
                  }
                >
                  <span className="font-roboto-mono text-sm text-black">
                    {`Beacon hash ${shortAddress(beaconHash ?? "")}`}
                  </span>
                </SkeletonWrapper>
                <Button variant="yellow" size="xs" fontWeight="regular">
                  copy
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 lg:gap-6">
        <div className="flex flex-col gap-1 lg:gap-[14px]">
          <h3 className="text-lg lg:text-[22px] font-medium leading-[28px] text-black">
            Download Final ZKey(s)
          </h3>
          <span className="text-sm lg:text-base font-normal lg:leading-[24px] text-black">
            Press the button below to download the final ZKey files from the S3
            bucket.
          </span>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-[10px]">
          <SkeletonWrapper
            isLoading={isLoadingArtifacts}
            items={9}
            placeholder={
              <div className="bg-slate-300 animate-pulse rounded-[35px] h-[40px]"></div>
            }
          >
            {finalZkeys?.map((zkey, index) => {
              const isDisabled = ceremony?.state !== CeremonyState.FINALIZED;
              return (
                <Link
                  href={zkey?.zkeyURL}
                  rel="noopener noreferrer"
                  className={cn(isDisabled && "pointer-events-none")}
                >
                  <Card
                    key={index}
                    variant="secondary"
                    size="xxs"
                    className={cn("!px-5")}
                    disabled={isDisabled}
                    withHover={!isDisabled}
                  >
                    <div className="flex items-center gap-2">
                      <Icons.Download />
                      <span className="text-xs text-black line-clamp-1">
                        {zkey?.zkeyFilename}
                      </span>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </SkeletonWrapper>
        </div>
      </div>

      {isFinalized && (
        <div className="flex flex-col gap-3 lg:gap-6">
          <h3 className="flex flex-col gap-1 lg:gap-[14px]">
            <span className="text-lg lg:text-[22px] font-medium leading-[28px] text-black">
              Download Last ZKey(s)
            </span>
            <span className="text-sm lg:text-base font-normal lg:leading-[24px] text-black">
              You can use this zKey(s) with the beacon value to verify that the
              final zKey(s) was computed correctly.
            </span>
          </h3>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-[10px]">
            <SkeletonWrapper
              isLoading={isLoadingArtifacts}
              items={9}
              placeholder={
                <div className="bg-slate-300 animate-pulse rounded-[35px] h-[40px]"></div>
              }
            >
              {lastZkeys?.map((zkey, index) => {
                const isDisabled = ceremony?.state !== CeremonyState.FINALIZED;
                return (
                  <Link
                    href={zkey?.zkeyURL}
                    rel="noopener noreferrer"
                    className={cn(isDisabled && "pointer-events-none")}
                  >
                    <Card
                      key={index}
                      variant="secondary"
                      size="xxs"
                      className={cn("!px-5")}
                      disabled={isDisabled}
                      withHover={!isDisabled}
                    >
                      <div className="flex items-center gap-2">
                        <Icons.Download />
                        <span className="text-xs text-black line-clamp-1">
                          {zkey?.zkeyFilename}
                        </span>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </SkeletonWrapper>
          </div>
        </div>
      )}
    </div>
  );
};
