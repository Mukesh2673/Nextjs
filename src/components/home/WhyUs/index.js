import {
  MdTabUnselected,
  MdFingerprint,
  MdCheckCircleOutline,
  MdAlarm,
} from "react-icons/md";

function WhyUs() {
  // content items
  const items = [
    {
      icon: <MdAlarm />,
      title: "Travel at your convenience",
      content:
        "Do you have a tight budget? We have Pickmeup Car Lite for you! Want to travel in extra comfort? Use Pickmeup Car Plus!",
    },
    {
      icon: <MdCheckCircleOutline />,
      title: "The best prices",
      content:
        "We offer the best ride prices in every city. You get to know your trip's cost before you book.",
    },
    {
      icon: <MdTabUnselected />,
      title: "Hasslefree and quick",
      content:
        "Pickmeup offers you a ride in minutes. With just a few clicks on the app, you can find a car quickly and get moving.",
    },
    {
      icon: <MdFingerprint />,
      title: "Freedom of choice",
      content:
        "Select the best offers from drivers in terms of the price, vehicle brand and estimated arrival time.",
    },
  ];

  return (
    <div className="WhyUs Section w-full flex flex-col padding-x row-gap">
      <div className="WhyUs-title">
        <h1 className="title primary">Why Pickmeup?</h1>
        <p className="text">
          Pickmeup is a great way to make your travel plans stress-free.
        </p>
      </div>
      <div className="WhyUs-items">
        {items.map((item, i) => (
          <div
            className="WhyUs-item flex flex-col items-start row-gap-s"
            key={i}
          >
            <div className="WhyUs-item-icon">{item.icon}</div>
            <p className="WhyUs-item-title sub-title w-full">{item.title}</p>
            <p className="WhyUs-item-content text w-full">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhyUs;
