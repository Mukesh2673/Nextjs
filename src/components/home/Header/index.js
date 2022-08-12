import { STRAPI_API_URL } from "lib/constants";
import React from "react";
import ReactMarkdown from "react-markdown";

function HomeHeaderBanner({ title, text, className }) {
  return (
    <div
      className={`Banner w-full flex flex-col align-center ${className} relative h-[590px] md:-[550px]`}
    >
      <div
        className={`w-full flex flex-wrap justify-start items-center h-full `}
      >
        <div
          className={`w-full h-full z-10 p-4 px-12 bg-gradient-to-r from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.1)]`}
        >
          <div className="flex h-full flex-col justify-center text-center md:text-start w-full md:w-1/2">
            <h1 className="title primary text-white">
              <ReactMarkdown>{title}</ReactMarkdown>
            </h1>
            <p className="Banner-text-text text pl-0 my-4 text-white w-full md:w-10/12">
              {text}
            </p>
            <div className="AppDownload-download flex items-center justify-center md:justify-start w-full col-gap pt-2 pb-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.pickmeup.rider"
                target="_blank"
                rel="noopener noreferrer"
                className="no-line"
              >
                <img
                  src="/assets/download_android.svg"
                  alt="Download android"
                />
              </a>
              <a
                href="https://apps.apple.com/gb/app/pickmeup-rider/id1423542581"
                target="_blank"
                rel="noopener noreferrer"
                className="no-line"
              >
                <img src="/assets/download_ios.svg" alt="Download iOS" />
              </a>
            </div>
          </div>
        </div>
        <img
          src={`${STRAPI_API_URL}/uploads/handheld_jpg_ed7d50d519.JPG`}
          alt="HandHeld"
          className="w-screen h-[590px] md:-[550px] absolute left-0 top-0 z-1 object-cover"
        />
      </div>
    </div>
  );
}

export default HomeHeaderBanner;
