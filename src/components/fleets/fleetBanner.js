import React from "react";

function FleetBannerForm({ title, subTitle, children }) {
  return (
    <div className="BannerForm items-start justify-end flex md:absolute md:top-0 md:left-0 md:right-0 md:bottom-0">
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

export default FleetBannerForm;
