// components/ClientLogoCarousel.js
import React from "react";
import Image from "next/image";

const ClientLogoCarousel = () => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-6 text-gray-500">
        Brands that trusts us
      </h2>
      <div className="overflow-hidden">
        <div className="flex animate-marquee gap-x-8 md:gap-x-16">
          <Image
            src="/vw.png"
            alt="Logo 1"
            width={48}
            height={48}
            className="object-contain"
          />
          <Image
            src="/Samsung.png"
            alt="Logo 2"
            width={48}
            height={48}
            className="object-contain"
          />
          <Image
            src="/Cisco.png"
            alt="Logo 3"
            width={64}
            height={64}
            className="object-contain"
          />
          <Image
            src="/Vimeo.png"
            alt="Logo 4"
            width={48}
            height={48}
            className="object-contain"
          />
          <Image
            src="/P&G.png"
            alt="Logo 5"
            width={48}
            height={48}
            className="object-contain"
          />
          <Image
            src="/HPE.png"
            alt="Logo 6"
            width={48}
            height={48}
            className="object-contain"
          />
          <Image
            src="/Citi.png"
            alt="Logo 7"
            width={48}
            height={48}
            className="object-contain"
          />
          <Image
            src="/Ericsson.png"
            alt="Logo 8"
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientLogoCarousel;
