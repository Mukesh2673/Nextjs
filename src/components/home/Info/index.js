import { MdCheckCircleOutline } from "react-icons/md";
import Car from "./Car";
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

function Info() {
  // next.js router
  const router = useRouter();

  // section image state, it changes randomly on each page render
  const [image, setImage] = useState("/assets/home/info/Image.png");

  // checking if element in view
  const { ref, inView } = useInView({
    threshold: 0.8,
  });

  // car moving state
  const [carMoving, setCarMoving] = useState(false);

  useEffect(() => {
    // we are want the animation to happen only the first time
    // when the element is in view.
    if (inView) {
      setCarMoving(true);
    }
  }, [inView]);

  useEffect(() => {
    // keeping default image in home page
    if (router.pathname === "/") return;

    // picking image randomly on page render
    setImage(`/assets/home/info/Image${Math.random() > 0.5 ? "2" : ""}.png`);
  }, []);

  return (
    <div
      className="Info Section w-full flex flex-col items-center padding-x relative"
      ref={ref}
    >
      {image === "/assets/home/info/Image.png" && <Car carMoving={carMoving} />}
      <div className="Info-text w-full">
        <div className="Info-text-title">
          <h1 className="title primary">
            Fastest growing
            <br />
            ride-hailing platform
          </h1>
          <p className="text">
            There's more to love in the app. Pick your destination, request a
            ride, meet your driver, enjoy the journey.
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
      <div
        className={`Info-image flex items-center justify-center ${
          image === "/assets/home/info/Image.png" ? "normal" : ""
        }`}
      >
        <div className="Info-image-wrapper">
          <img src={image} alt="Phone" className="covered-img" loading="lazy" />
        </div>
      </div>
    </div>
  );
}

export default Info;
