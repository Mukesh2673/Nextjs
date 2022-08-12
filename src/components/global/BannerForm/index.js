import React from "react";

function BannerForm({ title, subTitle, children }) {
  return (
    <div className="BannerForm flex items-start justify-end relative md:absolute top-0 left-0 right-0 bottom-0">
      <div className="BannerForm-content flex flex-col items-start row-gap">
        <div className="BannerForm-content-title flex flex-col items-start w-full">
          <h3 className="title tertiary">{title}</h3>
          <p className="text">{subTitle}</p>
        </div>
        <div className="BannerForm-content-content w-full">{children}</div>
      </div>
    </div>
  );
}

export default BannerForm;
