import { BsGear } from "react-icons/bs";
import { AiOutlineStock } from "react-icons/ai";
import { BiHomeAlt } from "react-icons/bi";

function WhyFranchise() {
  // content items
  const items = [
    {
      icon: <AiOutlineStock />,
      title: "Trusted brand",
      content:
        "With over a thousand daily customers, we are a trusted brand within and beyond Nigeria.",
    },
    {
      icon: <BsGear />,
      title: "Growth-inclined",
      content: "Our policies are designed to help you scale.",
    },
    {
      icon: <BiHomeAlt />,
      title: "Support & Assistance",
      content: "You get support from our expert team on set-up and launch.",
    },
  ];

  return (
    <div className="WhyFranchise WhyUs Section w-full flex flex-col padding-x row-gap">
      <div className="WhyUs-title">
        <h1 className="title primary">Why Pickmeup Franchise?</h1>
        <p className="text">
          We are one of the fastest-growing mobility startups in Nigeria.
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

export default WhyFranchise;
