import { Button } from "components";
import { useRouter } from "next/router";
import { MdArrowForward } from "react-icons/md";

const contents = [
  {
    title: "Why ride with us?",
    content:
      "Find out how Pickmeup can solve your transportation challenges with our easy web and mobile booking, flexible riding options, transparent pricing, real-time tracking, email confirmations and feature-rich API.",
    buttonText: "Sign up to ride",
    link: "https://customer.pickmeup.ng/",
  },
  {
    title: "Why drivers choose us?",
    content:
      "Become Pickmeup's partner and grow your business, join us on our journey solving transportation challenges with our easy web and mobile booking, flexible riding options and transparent pricing.",
    buttonText: "Sign up to drive",
    link: "/driver",
  },
];

function Actions() {
  // next js router
  const router = useRouter();

  return (
    <div className="Actions padding-x Section w-full flex flex-col md:flex-row items-start justify-between">
      {contents.map((item, i) => (
        <div
          className="Actions-item flex flex-col items-start justify-between w-full self-stretch my-0"
          key={i}
        >
          <div>
            <h3 className="title secondary">{item.title}</h3>
            <p className="text pt-4">{item.content}</p>
          </div>
          <Button type="secondary" onClick={() => router.push(item.link)}>
            {item.buttonText}
            <span>
              <MdArrowForward />
            </span>
          </Button>
        </div>
      ))}
    </div>
  );
}

export default Actions;
