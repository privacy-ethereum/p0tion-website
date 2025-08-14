import { AppContent } from "@/app/components/layouts/AppContent";
import { SkeletonWrapper } from "@/app/components/layouts/SkeletonWrapper";
import { Icons } from "@/app/components/shared/Icons";
import { Button } from "@/app/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

interface ContributionCompletedProps {
  name?: string;
  isLoading?: boolean;
}

export const ContributionCompleted = ({
  name,
  isLoading = false,
}: ContributionCompletedProps) => {
  const shareOnTwitter = () => {
    const tweetText = `
      I contributed to the Semaphore V4 Ceremony! You can view the steps to contribute here:
      https://ceremony.pse.dev You can view my attestation here:
      https://gist.github.com/maripoveda/2a5c74bb89ff5f5f0
    `;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareOnFarcaster = () => {
    const castText = `
      I contributed to the Semaphore V4 Ceremony! You can view the steps to contribute here:
      https://ceremony.pse.dev You can view my attestation here:
      https://gist.github.com/maripoveda/2a5c74bb89ff5f5f0
    `;
    window.open(
      `https://warpcast.com/~/compose?text=${encodeURIComponent(castText)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  return (
    <div className=" text-center">
      <div className="bg-[#EAECE1] py-10 lg:pt-[90px] lg:pb-[140px]">
        <AppContent>
          <div className="flex flex-col gap-7 overflow-hidden">
            <div className="flex flex-col overflow-hidden">
              <Image
                src="/ceremonies/contribution-completed.webp"
                alt="contribution completed"
                width={250}
                height={250}
                className="mx-auto lg:w-[250px] lg:h-[250px] w-[100px] h-[100px]"
              />
              <SkeletonWrapper
                isLoading={isLoading}
                placeholder={
                  <div className="lg:w-[250px] w-1/2 mx-auto h-[24px] bg-slate-300 animate-pulse" />
                }
              >
                <span className="font-medium text-base lg:text-2xl">
                  {name}
                </span>
              </SkeletonWrapper>
            </div>
            <SkeletonWrapper
              isLoading={isLoading}
              placeholder={
                <div className="w-1/2 mx-auto lg:h-[48px] h-[18px] bg-slate-300 animate-pulse" />
              }
            >
              <h1 className="lg:text-5xl text-lg text-black font-medium">
                You have contributed to all the circuits!
              </h1>
            </SkeletonWrapper>
          </div>
        </AppContent>
      </div>

      <div className="bg-white text-center">
        <AppContent className="flex flex-col gap-10 lg:gap-14 py-10 lg:py-[120px] max-w-[768px] mx-auto justify-between">
          <SkeletonWrapper
            isLoading={isLoading}
            placeholder={
              <div className="flex flex-col gap-2">
                <div className="w-1/2 lg:w-full mx-auto h-[24px] bg-slate-300 animate-pulse" />
                <div className="w-1/2 lg:w-full mx-auto h-[24px] bg-slate-300 animate-pulse" />
                <div className="w-1/2 lg:w-[78px] mx-auto h-[24px] bg-slate-300 animate-pulse" />
              </div>
            }
          >
            <span className="text-base lg:text-3xl text-black font-medium">
              {`Share your attestation that you have contributed to the ${name}
            Ceremony`}
            </span>
          </SkeletonWrapper>
          <div className="flex gap-5 mx-auto">
            <Button
              onClick={shareOnTwitter}
              icon={<Icons.Twitter />}
              className="uppercase"
            >
              Twitter
            </Button>
            <Button
              onClick={shareOnFarcaster}
              icon={<Icons.Farcaster />}
              className="uppercase"
            >
              Farcaster
            </Button>
          </div>
          <Link className="flex gap-0.5 items-center mx-auto" href="">
            <Icons.Github size={18} />
            <span className="text-base underline">
              View your Github gist of the contribution
            </span>
            <Icons.External size={18} />
          </Link>
        </AppContent>
      </div>
    </div>
  );
};
