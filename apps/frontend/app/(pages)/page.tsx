import { CeremoniesSection } from "../sections/homepage/CeremoniesSection";
import { FaqSection } from "../sections/homepage/FaqSection";
import { HomeIntroSection } from "../sections/homepage/HomeIntroSection";
import { TrustedBySection } from "../sections/homepage/TrustedBySection";

export default function Home() {
  return (
    <>
      <HomeIntroSection />
      <CeremoniesSection />
      <TrustedBySection />
      <FaqSection />
    </>
  );
}
