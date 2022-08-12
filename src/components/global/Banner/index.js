import React from "react";

function Banner({
  title,
  text,
  children,
  className,
  noWrapper,
  wrapperClassName,
  classNameForTitle,
}) {
  return (
    <div
      className={`Banner w-full padding-x flex flex-col align-center ${className}`}
    >
      <div
        className={`Banner-text w-full flex flex-wrap  justify-between ${
          classNameForTitle || "items-center"
        }`}
      >
        <div
          className={`Banner-text-title ${text ? "w-half" : "w-65"} ${
            classNameForTitle ? "-mt-3" : ""
          }`}
        >
          <h1 className="title primary">{title}</h1>
        </div>
        {text && (
          <div className="Banner-text-text w-half">
            <p className="text">{text}</p>
          </div>
        )}
      </div>
      {!noWrapper ? (
        <div className={`Banner-wrapper w-full ${wrapperClassName}`}>
          {children}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Banner;
