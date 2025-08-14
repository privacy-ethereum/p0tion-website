import { useClipboard } from "@/app/hooks/useClipboard";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Modal } from "../ui/Modal";

export const ContributeCliModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { onCopy: onCopyFirstStep, hasCopied: hasCopiedFirstStep } =
    useClipboard("npm install -g @p0tion/phase2cli");

  const { onCopy: onCopySecondStep, hasCopied: hasCopiedSecondStep } =
    useClipboard("phase2cli auth");

  const { onCopy: onCopyThirdStep, hasCopied: hasCopiedThirdStep } =
    useClipboard("phase2cli contribute");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-[36px]">
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-black text-[28px] leading-[32px] font-medium">
            Contribute with CLI
          </h1>
          <span className="text-black text-base font-normal">
            You can contribute to this project by running the CLI commands
            below:
          </span>
        </div>
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-black">Step 1</span>
              <span className="text-base lg:text-[22px] font-medium text-black">
                Download p0tion
              </span>
            </div>
            <Card variant="secondary">
              <div className="flex items-center justify-between w-full">
                <span className="text-sm font-medium text-black font-roboto-mono">
                  {`> npm install -g @p0tion/phase2cli`}
                </span>
                <Button
                  variant={hasCopiedFirstStep ? "outline-black" : "yellow"}
                  size="xs"
                  fontWeight="regular"
                  onClick={() => {
                    onCopyFirstStep();
                  }}
                >
                  {hasCopiedFirstStep ? "copied" : "copy"}
                </Button>
              </div>
            </Card>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-black">Step 2</span>
              <span className="text-base lg:text-[22px] font-medium text-black">
                Login with CLI
              </span>
            </div>
            <Card variant="secondary">
              <div className="flex items-center justify-between w-full">
                <span className="text-sm font-medium text-black font-roboto-mono">
                  {`> phase2cli auth`}
                </span>
                <Button
                  variant={hasCopiedSecondStep ? "outline-black" : "yellow"}
                  size="xs"
                  fontWeight="regular"
                  onClick={() => {
                    onCopySecondStep();
                  }}
                >
                  {hasCopiedSecondStep ? "copied" : "copy"}
                </Button>
              </div>
            </Card>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-black">Step 3</span>
              <span className="text-base lg:text-[22px] font-medium text-black">
                Contribute to the ceremony
              </span>
            </div>
            <Card variant="secondary">
              <div className="flex items-center justify-between w-full">
                <span className="text-sm font-medium text-black font-roboto-mono">
                  {`> phase2cli contribute`}
                </span>
                <Button
                  variant={hasCopiedThirdStep ? "outline-black" : "yellow"}
                  size="xs"
                  fontWeight="regular"
                  onClick={() => {
                    onCopyThirdStep();
                  }}
                >
                  {hasCopiedThirdStep ? "copied" : "copy"}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Modal>
  );
};
