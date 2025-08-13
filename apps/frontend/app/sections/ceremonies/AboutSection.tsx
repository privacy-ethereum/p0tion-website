import { AttributeCard } from "@/app/components/AttributeCard";
import { Card } from "@/app/components/ui/Card";
import { useGetCeremonyStats } from "@/app/hooks/useGetCeremonyData";
import { shortAddress } from "@/app/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

export const AboutSection = () => {
  const { id } = useParams();

  const { data: ceremonyStats } = useGetCeremonyStats(id as string);

  console.log("ceremonyStats", ceremonyStats);

  return null;
  
};
