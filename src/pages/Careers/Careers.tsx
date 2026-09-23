import { useState } from "react";

import "./Careers.css";
import WhoWeAre from "./components/WhoWeAre";
import Perks from "./components/Perks";
import CareersCTA from "./components/CareersCTA";
import Openings from "./components/Openings";
import Apply from "./components/Apply";
import CareersHero from "./components/CareersHero/CareersHero";

const Careers = () => {
  const [selectedPosition, setSelectedPosition] = useState("CRM Manager");

  const handleApply = (jobTitle: string) => {
    setSelectedPosition(jobTitle);

    setTimeout(() => {
      document.getElementById("careers-apply")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  return (
    <main className="careers-page">
      <CareersHero />
      <WhoWeAre />

      <Perks />

      <CareersCTA />

      <Openings onApply={handleApply} />

      <div id="careers-apply">
        <Apply selectedPosition={selectedPosition} />
      </div>
    </main>
  );
};

export default Careers;
