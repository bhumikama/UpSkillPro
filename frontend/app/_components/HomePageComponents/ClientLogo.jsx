import React from "react";
import Image from "next/image";

const ClientLogoCarousel = () => {
  return (
    <div className="max-w-screen-lg mx-auto my-4 text-center">
      <h2 className="text-2xl font-semibold mt-8 mb-6 text-gray-500">
        Brands that trusts us
      </h2>
      <div className="overflow-hidden">
        <div className="flex animate-marquee gap-x-8 md:gap-x-16">
          {[
            { src: "/vw.png", alt: "VW Logo" },
            { src: "/Samsung.png", alt: "Samsung Logo" },
            { src: "/Cisco.png", alt: "Cisco Logo", size: "h-16 w-16" },
            { src: "/Vimeo.png", alt: "Vimeo Logo" },
            { src: "/P&G.png", alt: "P and G Logo" },
            { src: "/HPE.png", alt: "HPE Logo" },
            { src: "/Citi.png", alt: "Citi Logo" },
            { src: "/Ericsson.png", alt: "Ericsson Logo" },
          ].map((logo, index) => (
            <Image
              key={index}
              src={logo.src}
              alt={logo.alt}
              width={48}
              height={48}
              className={`${logo.size || "h-12 w-12"} object-contain`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientLogoCarousel;
