import { Button } from "components";
import { MdArrowForward } from "react-icons/md";
import { BsCheck2 } from "react-icons/bs";

function Landing() {
  return (
    <div className="Dispatcher-Landing w-full padding-x flex flex-col items-center row-gap">
      <div className="Dispatcher-Landing-header w-full flex flex-col items-center justify-between row-gap col-gap">
        <div className="Dispatcher-Landing-header-title flex flex-col items-center text-center w-full">
          <h3 className="title primary text-center">
            Taxi Dispatcher Software
          </h3>
          <p className="text text-center">
            World-class system to manage drivers, dispatchers and clients.
          </p>
        </div>
        <div className="Dispatcher-Landing-header-button w-full flex flex-col items-center">
          <Button type="primary" onClick={() => window.open("/")}>
            Get Started
            <span>
              <MdArrowForward />
            </span>
          </Button>
        </div>
      </div>
      <div className="Dispatcher-Landing-items w-full flex flex-col md:flex-row items-center row-gap col-gap">
        {data.map((item, i) => (
          <div
            className="Dispatcher-Landing-items-item flex flex-row items-start row-gap col-gap"
            key={i}
          >
            <div className="Dispatcher-Landing-items-item-icon md:mt-2">
              <BsCheck2 />
            </div>
            <div className="Dispatcher-Landing-items-item-text flex flex-col ">
              <h3 className="sub-title text-start mb-2">{item.title}</h3>
              <p className="text">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="Dispatcher-Landing-image w-full flex items-center justify-center">
        <img
          src="/assets/dispatcher/landing.png"
          alt="Dispatcher"
          className="covered-img"
        />
      </div>
    </div>
  );
}

const data = [
  {
    title: "Cut costs",
    content:
      "Web based dispatch software with no setup costs or special hardware.",
  },
  {
    title: "Be efficient",
    content: "Auto-dispatching based on drivers location and custom queues.",
  },
  {
    title: "Get more rides",
    content: "Acquire new customers with iPhone and Android apps.",
  },
];

export default Landing;
