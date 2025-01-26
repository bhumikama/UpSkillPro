// components/ClientLogoCarousel.js
import React from "react";

const ClientLogoCarousel = () => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-6 text-gray-500">
        Brands that trusts us
      </h2>
      <div className="overflow-hidden">
        <div className="flex animate-marquee gap-x-8 md:gap-x-16">
          <img
            src="/vw.png"
            alt="Logo 1"
            className="h-12 w-12 object-contain"
          />
          <img
            src="/Samsung.png"
            alt="Logo 2"
            className="h-12 w-12 object-contain"
          />
          <img
            src="/Cisco.png"
            alt="Logo 3"
            className="h-16 w-16 object-contain"
          />
          <img
            src="/Vimeo.png"
            alt="Logo 4"
            className="h-12 w-12 object-contain"
          />
          <img
            src="/P&G.png"
            alt="Logo 5"
            className="h-12 w-12 object-contain"
          />
          <img
            src="/HPE.png"
            alt="Logo 6"
            className="h-12 w-12 object-contain"
          />
          <img
            src="/Citi.png"
            alt="Logo 7"
            className="h-12 w-12 object-contain"
          />
          <img
            src="/Ericsson.png"
            alt="Logo 8"
            className="h-12 w-12 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientLogoCarousel;
