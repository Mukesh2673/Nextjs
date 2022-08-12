import Head from "next/head";
import { Actions, AppDownload } from "components/home";
import { Button, Footer } from "components";
import { TiTick } from "react-icons/ti";
import { MdCheckCircleOutline } from "react-icons/md";
import { STRAPI_API_URL } from "lib/constants";
const safetyMeasures = [
  {
    title: "Trip Safety Feedback",
  },
  {
    title: "Safety features in the app",
  },
  {
    title: "An inclusive community",
  },
  {
    title: "Support at every turn",
  },
  {
    title: "Expert-led guidance",
  },
  {
    title: "Door-to-Door Safety Standard",
  },
];
const contents = [
  {
    title: "Vulnerability disclosure",
    content:
      "It is Pickmeup's goal to offer the best and most secure products and services. We value the work of security researchers who spend time and effort helping us to make our platform and apps more secure. If you have discovered security issue, then please see our Public Vulnerability Reporting Policy. Tap a button for emergency assistance. Share your trip details with loved ones. Our technology helps put peace of mind at your fingertips.",
  },
  {
    title: "Supplier information security",
    content:
      "Information security requirements apply to any third party who has access to Pickmeup data. Requirements can be found from Information Security Code for Practice. Thousands of riders and drivers share a set of Community Guidelines, holding each other accountable to do the right thing. A specially trained team is available 24/7. Contact them via the app, day or night, with any questions or safety concerns. ",
  },
];

function Safety() {
  return (
    <>
      <Head>
        <title>Pickmeup - Safety</title>
        <meta
          name="description"
          content="Pickmeup & associated services have been developed to combat 
            the current ride-hailing challenges faced by urban & rural users. 
            Designed with a simplistic UI for users with multi-language support, 
            Pickmeup is an all-rounded dependable platform for customers & drivers."
        />
      </Head>
      <div className="Business Page wrapper">
        <div className="flex gap-16 items-center padding-x">
          <div className="md:w-1/2 w-full">
            <h1 className="title primary">
              Building safer journeys for everyone
            </h1>
            <p className="text my-4">
              We look forward to the opportunities ahead, to be connected with
              people and places that matter most. This is why we're focused on
              your safety - from setting new standards to developing technology
              with the goal of reducing incidents.
            </p>
            {checkData.map((item, i) => (
              <div
                className="Info-content-item flex items-start col-gap  my-8 md:w-[80%]"
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
          <div className="md:w-1/2 w-full hide-for-mobile">
            <div className="Info-image-wrapper12 relative overflow-hidden">
              <img
                src={`${STRAPI_API_URL}/uploads/safety_jpg_ba5172bd49.JPG`}
                alt="Phone"
                className="covered-img h-auto w-full"
                loading="lazy"
              />
              <div className="absolute bottom-5 left-10 px-10 py-4 ">
                <p className="leading-normal text-gray-100 text-2xl text-cneter">
                  Pickmeup is certified and complies with the requirements of
                  PCI DSS and ISO 27001.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Home Page for-section">
        <div className="GetARide Section w-full padding-x">
          <div className="wrapper md:flex items-center w-full gap-24 pb-20">
            <div className="md:w-3/5 w-full">
              <h1 className="title primary">
                How safety is built into your experience
              </h1>
              <p className="text my-2">
                Count on 24/7 support and emergency assistance. Share your trip
                with loved ones. Our focus is on your safety, so you can focus
                on the opportunity. Thousands of trips are requested every day.
                Every rider has access to safety features built into the app and
                every trip has a support team if you need them.
              </p>
              <Button type={"primary"} TMLtype="submit" className="my-6">
                Learn More
              </Button>
            </div>
            <div className="md:w-2/5 w-full pt-8">
              {safetyMeasures.map((item, i) => (
                <div
                  className="GetARide-text-content-item flex  items-center row-gap-s py-4"
                  key={i}
                >
                  <div className="p-2 bg-[#e1eafe] rounded-md mr-4">
                    <TiTick style={{ fontSize: 16, color: "#175FBE" }} />
                  </div>
                  <p className="sub-title">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="Home Page for-section wrapper">
        <div className="Actions padding-x Section w-full flex flex-col md:flex-row items-end justify-between">
          {contents.map((item, i) => (
            <div
              className="Actions-item flex flex-col items-start row-gap w-full"
              key={i}
            >
              <h4 className="title tertiary">{item.title}</h4>
              <p className="text">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <AppDownload />
      </div>
      <div className="Cities Page for-section wrapper">
        <Actions />
      </div>
      <div className="Home Page for-section">
        <Footer />
      </div>
    </>
  );
}

const checkData = [
  {
    title: "Face Covering Check",
    content:
      "In cities where face coverings are required, we ask drivers to take a photo of themselves before they can begin driving, and our technology helps verify that they are wearing a face covering.",
  },
  {
    title: "Trip Safety Feedback",
    content:
      "In cities where face coverings are required, you are able to leave feedback on health issues, such as a driver not wearing a face covering or a mask. This helps us improve and holds everyone accountable.",
  },
  {
    title: "Health and safety supplies for drivers",
    content:
      "We want you to feel safe riding with Pickmeup as our communities start to move again. We have provided drivers with health and safety supplies like face covers and disinfectants.",
  },
];

export default Safety;
