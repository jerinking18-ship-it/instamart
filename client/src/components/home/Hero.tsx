import { LeafIcon } from "lucide-react";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden min-h-[540px] mb- rounded flex items-center">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="src/assets/images/dvban.png"
        alt=""
      />
      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-xl xl:pl-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xm font-semibold text-lime-600 bg-orange-600/10 rounded-full">
            <LeafIcon className="size-3" />
            Farm-Fresh & Organic
          </span>
        </div>
      </div>
      <div />
    </section>
  );
};

export default Hero;
