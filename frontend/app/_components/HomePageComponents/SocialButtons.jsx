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
        <FacebookShareButton  url={"http://localhost:3000"}>
          <FacebookIcon size={60}/>
        </FacebookShareButton>
        <PinterestShareButton url={"http://localhost:3000"}>
          <PinterestIcon size={60} />
        </PinterestShareButton>
        <RedditShareButton url={"http://localhost:3000"}>
          <RedditIcon size={60} />
        </RedditShareButton>
        <WhatsappShareButton url={"http://localhost:3000"}>
          <WhatsappIcon size={60} />
        </WhatsappShareButton>
        <LinkedinShareButton url={"http://localhost:3000"}>
          <LinkedinIcon size={60} />
        </LinkedinShareButton>
      </div>
    </div>
  );
}
