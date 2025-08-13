import { AttributeCard } from "@/app/components/AttributeCard";
import { Card } from "@/app/components/ui/Card";
import { useGetCeremonyAbout } from "@/app/hooks/useGetCeremonyAbout";
import { useGetCeremonyStats } from "@/app/hooks/useGetCeremonyData";
import { shortAddress } from "@/app/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

export const AboutSection = () => {
  const { id } = useParams();

  const { data: ceremonyStats } = useGetCeremonyStats(id as string);

  console.log("ceremonyStats", ceremonyStats);

  return null;
  return (
    <div className="flex flex-col gap-5">
      {[].map((about, index) => (
        <Card key={index} size="sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <AttributeCard title="Parameters" value={about.title} size="sm" />
            <AttributeCard
              title="Commit Hash"
              value={shortAddress(about.commitHash)}
              removeBorderLeft
              size="sm"
            />
            <AttributeCard
              className="col-span-2"
              title="Template Link"
              value={
                <Link
                  href={about.templateLink}
                  target="_blank"
                  className="underline"
                >
                  {about.templateLink}
                </Link>
              }
              removeBorderBottom
              size="sm"
            />
          </div>
        </Card>
      ))}
    </div>
  );
};
