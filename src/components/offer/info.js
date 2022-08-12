import { MdCheckCircleOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";

const contents = [
  {
    title: "Safe and convenient",
    content: "Moving with Pickmeup is easy, convenient and fast.",
  },
  {
    title: "Happy drivers, happy riders",
    content: "Pickmeup drivers earn more, thanks to lower commission rates.",
  },
  {
    title: "Always there for you",
    content: "Get fast support, whenever you need it.",
  },
];

function OfferInfo() {
  return (
    <div className="Info w-full flex flex-col items-center padding-x relative justify-center">
      <div className=" w-full">
        <div className="Info-text-title -mt-8 ">
          <h1 className="title primary">Pickmeup Ride Offers</h1>
          <p className="text">
            There's more to love in the app. Pick your destination, request a
            ride, <br /> meet your driver, enjoy the journey.
          </p>
        </div>
        <div className="Info-content flex flex-col items-start row-gap w-full">
          {contents.map((item, i) => (
            <div
              className="Info-content-item flex items-center col-gap w-full"
              key={i}
            >
              <div className="Info-content-item-icon">
                <MdCheckCircleOutline />
              </div>
              <div className="Info-content-item-text">
                <p className="sub-title">{item.title}</p>
                <p className="text">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`Info-image flex items-center justify-center `}>
        <div className="Info-image-wrapper">
          <img
            src={"assets/offer/Group.png"}
            alt="Phone"
            className="covered-img"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default OfferInfo;
