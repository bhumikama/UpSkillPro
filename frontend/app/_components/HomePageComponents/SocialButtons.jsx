import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share";

export default function SocialButtons() {
  return (
    <div className="bg-white py-4 mt-2 rounded-md shadow-lg">
      <h1 className="text-center text-xl mb-2">Share with others</h1>
      <div className="flex justify-center gap-5">
        <FacebookShareButton url={"http://localhost:3000"}>
          <FacebookIcon size={45} />
        </FacebookShareButton>
        <PinterestShareButton url={"http://localhost:3000"}>
          <PinterestIcon size={45} />
        </PinterestShareButton>
        <RedditShareButton url={"http://localhost:3000"}>
          <RedditIcon size={45} />
        </RedditShareButton>
        <WhatsappShareButton url={"http://localhost:3000"}>
          <WhatsappIcon size={45} />
        </WhatsappShareButton>
        <LinkedinShareButton url={"http://localhost:3000"}>
          <LinkedinIcon size={45} />
        </LinkedinShareButton>
      </div>
    </div>
  );
}
