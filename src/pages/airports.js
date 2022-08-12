import { Help } from "components/support";
import { useState, useEffect } from "react";
import Head from "next/head";
import RideFAQ from "components/support/RideFAQ";
import { Actions, AppDownload, GetARide } from "components/home";
import { Banner, Footer } from "components";
import { Section } from "components/cities";
import { GiCommercialAirplane } from "react-icons/gi";
import { MdPersonOutline, MdAlarm } from "react-icons/md";
import { TiLocationOutline, TiPen, TiTick } from "react-icons/ti";
import { STRAPI_API_URL } from "lib/constants";

const items = [
  {
    title: "Request a ride around the world",
    content:
      "Tap a button and get airport transportation at more than 500 major hubs.",
  },
  {
    title: "Get around like a local",
    content:
      "Let the app and your driver handle the details, so you don't have to navigate an unfamiliar city.",
  },
  {
    title: "Feel at home with Pickmeup",
    content:
      "Find your favorite features, including real-time pricing and cash-free payment, even if you're in a new place.",
  },
];

function FAQ() {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const res = await fetch(`${STRAPI_API_URL}/api/airports`, {
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
      });
      const temp = await res.json();
      if (temp.data) {
        setData(temp.data?.sort(() => 0.5 - Math.random()));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="Business Page wrapper">
        <Head>
          <title>Pickmeup - Airports</title>
          <meta
            name="description"
            content="Pickmeup & associated services have been developed to combat 
            the current ride-hailing challenges faced by urban & rural users. 
            Designed with a simplistic UI for users with multi-language support, 
            Pickmeup is an all-rounded dependable platform for customers & drivers."
          />
        </Head>
        <Banner
          title={`See you there: access to rides at ${
            data?.length || 0
          } Airports`}
          text="Request a ride to the airport. In most regions, you'll also have the option to schedule an airport pickup or dropoff in advance. No need to wait for the airport shuttle, just download the Pickmeup app and go!"
          noWrapper
        />

        <Section imgs={["/assets/airports/plane.png"]}>
          {data?.map((item, i) => (
            <>
              <div
                className="Info-content-item flex items-center col-gap w-full p-6"
                key={i}
              >
                <div className="Info-content-item-icon">
                  <GiCommercialAirplane />
                </div>
                <div className="Info-content-item-text">
                  <p className="sub-title">{item.attributes?.name}</p>
                </div>
              </div>
              <div className="line"></div>
            </>
          ))}
        </Section>

        <div className="WhyUs Section w-full flex flex-col padding-x row-gap">
          <div className="WhyUs-title">
            <h1 className="title primary">A smarter way to travel</h1>
            <p className="text">
              Pickmeup to or from {data?.length || 0} airports. No need to wait
              for the airport shuttle, just download the Pickmeup app and go!
            </p>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-20">
            {items.map((item, i) => (
              <div className="flex justify-between items-start gap-4" key={i}>
                <div className="p-2 bg-[#e8eff9] rounded-md ">
                  <TiTick style={{ fontSize: 14, color: "#175FBE" }} />
                </div>
                <div>
                  <p className="WhyUs-item-title sub-title w-full">
                    {item.title}
                  </p>
                  <p className="WhyUs-item-content text w-full">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="Home Page for-section">
        <GetARide />
      </div>
      <div className="Home Page for-section wrapper">
        <RideFAQ />
        <Help />
      </div>
      <div className="Home Page for-section">
        <AppDownload />
      </div>
      <div className="Home Page for-section">
        <Footer />
      </div>
    </>
  );
}

export default FAQ;
