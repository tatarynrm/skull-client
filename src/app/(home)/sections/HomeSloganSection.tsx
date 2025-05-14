import { HeroTextTransition } from "@/components/text/text-transition/HeroTextTransition";
import React from "react";

const HomeSloganSection = () => {
  return (
    <section className="slogan pt-10  flex  text-center w-full">
      <div className="slogan__wrapper w-full text-center items-center justify-center m-auto">
   
        <HeroTextTransition />
      </div>
    </section>
  );
};

export default HomeSloganSection;
