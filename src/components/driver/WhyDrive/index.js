import { MdPersonOutline, MdAlarm } from "react-icons/md";
import { TiLocationOutline, TiPen } from "react-icons/ti";

function WhyUs() {
  // content items
  const items = [
    {
      icon: <TiLocationOutline />,
      title: "Earn anytime,anywhere",
      content:
        "You can drive when you want, where you want, and how you want. And you can choose how and when you want to get paid.",
    },
    {
      icon: <MdAlarm />,
      title: "Set your own schedule",
      content:
        "Only drive when it works for you. There's no office and no boss. That means you'll always start and stop on your time.",
    },
    {
      icon: <TiPen />,
      title: "Signing up is easy",
      content:
        "Sign up to gain access to the app. After your account activation is complete, you can start earning.",
    },
    {
      icon: <MdPersonOutline />,
      title: "No middlemen",
      content:
        "Get paid directly by passengers at the end of their rides. There's no need to wait for payments anymore.",
    },
  ];

  return (
    <div className="WhyUs Section w-full flex flex-col padding-x row-gap mt-8 md:mt-16">
      <div className="WhyUs-title">
        <h1 className="title primary">Drive when you want</h1>
        <p className="text">
          These are the services you can be a part of. Earn good money with your
          vehicle.
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
