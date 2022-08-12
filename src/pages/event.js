import Head from "next/head";
import { Banner, Button, Footer } from "components";
import { AppDownload } from "components/home";
import { TiTick } from "react-icons/ti";
import { MdCheckCircleOutline } from "react-icons/md";
import { useState, useEffect } from "react";
import { STRAPI_API_URL } from "lib/constants";

const safetyMeasures = [
  {
    title: "Simple to set-up",
  },
  {
    title: "Fast and Flexible",
  },
  {
    title: "Happy guest",
  },
  {
    title: "Unique event codes",
  },
  {
    title: "Curb-to-curb transportation",
  },
  {
    title: "No fees applied",
  },
];

const event = [
  {
    title: "Company Outings",
    content:
      "Get your team together for some after-hours bonding without worrying about how they're getting home.",
  },
  {
    title: "Weddings",
    content:
      "Provide convenient and flexible transportation to your special day, without parking and shuttle headaches.",
  },
  {
    title: "Conferences",
    content:
      "Increase attendance, and help participants focus on learning instead of coordinating transportation.",
  },
];
function Event() {
  const [events, setEvents] = useState([]);
  const getEvents = async () => {
    try {
      const res = await fetch(`${STRAPI_API_URL}/api/events?populate=*`, {
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
      });
      const temp = await res.json();
      if (temp.data) {
        setEvents(temp.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getEvents();
  }, []);
  return (
    <>
      <Head>
        <title>Pickmeup - Event</title>
        <meta
          name="description"
          content="Pickmeup & associated services have been developed to combat 
            the current ride-hailing challenges faced by urban & rural users. 
            Designed with a simplistic UI for users with multi-language support, 
            Pickmeup is an all-rounded dependable platform for customers & drivers."
        />
      </Head>

      <div className="Page  wrapper padding-x">
        <div className="hidden md:block">
          <Banner>
            <div className="BannerForm  absolute top-20 left-10 right-0 bottom-0 items-start justify-start">
              <div className="border rounded shadow md:p-8 p-4 bg-white md:w-1/2 w-full">
                <h1 className="title primary">Pickmeup Events</h1>
                <p className="text my-4 ">
                  Ensure your guests have a convenient ride to and from your
                  event and let us do the driving. Create a unique event code
                  for any occasion and share it with your guests. Gift your
                  guests Pickmeup rides. Make it easier for your guests to get
                  to and from your next event.
                </p>
                <Button type={"primary"} TMLtype="submit" className="my-6">
                  Create Event
                </Button>
              </div>
            </div>

            <img
              src={`${STRAPI_API_URL}/uploads/quotes_44343008c1.png`}
              alt="Support"
              className="h-4/5 w-full "
            />
          </Banner>
        </div>

        <div className="BannerForm flex md:hidden items-start justify-start pt-0 -mt-6">
          <div className="border rounded shadow p-4 bg-white md:w-1/2 w-full">
            <h1 className="title primary">Pickmeup Events</h1>
            <p className="text my-4 ">
              Ensure your guests have a convenient ride to and from your event
              and let us do the driving. Create a unique event code for any
              occasion and share it with your guests. Gift your guests Pickmeup
              rides. Make it easier for your guests to get to and from your next
              event.
            </p>
            <Button type={"primary"} TMLtype="submit" className="my-6">
              Create Event
            </Button>
          </div>
        </div>
        <div className="w-full my-0 padding-x">
          <h1 className="title primary">How Pickmeup Event Works</h1>
          <p className="text md:w-3/5">
            There's more to love in the app. Pick your destination, request a
            ride, meet <br /> your driver, enjoy the journey.
          </p>
          <div className="grid md:grid-cols-5 gap-20 md:mt-4 items-center">
            <div className="md:col-span-2 md:mt-0 mt-6">
              <div className="Info-content flex flex-col items-start row-gap w-full">
                {items.map((item, i) => (
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
            <div className="md:col-span-3">
              <img src="assets/Car.png" alt="car" className="w-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="Home Page for-section ">
        <div className="GetARide Section w-full ">
          <div className="wrapper md:flex items-center w-full gap-12 pb-20 padding-x">
            <div className="md:w-1/2 w-full">
              <h1 className="title primary">Your Event, Your Way</h1>
              <p className="text my-2 md:pr-24">
                Pickmeup Events is a self-serve option where you can create up
                to 1,000 ride codes that last for up to 30 days. You can set up
                restrictions for use of your event codes, such as start and end
                times and pickup/drop-off locations.
              </p>
              <Button type={"primary"} TMLtype="submit" className="my-6">
                Create Event
              </Button>
            </div>
            <div className="md:w-1/4 w-full h-full">
              {safetyMeasures.slice(0, 3).map((item, i) => (
                <div
                  className="GetARide-text-content-item flex  items-start row-gap-s py-4 h-[92px]"
                  key={i}
                >
                  <div className="p-2 bg-[#e1eafe] rounded-md mr-4">
                    <TiTick style={{ fontSize: 16, color: "#175FBE" }} />
                  </div>
                  <p className="sub-title">{item.title}</p>
                </div>
              ))}
            </div>
            <div className="md:w-1/4 w-full">
              {safetyMeasures.slice(3, 6).map((item, i) => (
                <div
                  className="GetARide-text-content-item flex  items-start row-gap-s py-4 h-[92px]"
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

      <div className="Home Page for-section wrapper ">
        <div className="padding-x">
          <h1 className="title primary">Rides for every event</h1>
          <p className="text w-3/5">
            We've been really busy this year making things like this happen.
          </p>
          <div className="grid md:grid-cols-3 grid:cols-1 my-8 gap-10">
            {events.map((item, i) => (
              <div className="col-span-1" key={i}>
                <div className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
                  <img
                    className="object-cover w-full h-[500px] "
                    src={
                      item?.attributes?.image?.data?.attributes?.url
                        ? `${STRAPI_API_URL}${item?.attributes?.image?.data?.attributes?.url}`
                        : "assets/outings.jpg"
                    }
                    alt="Flower and sky"
                  />

                  <div className="absolute bottom-0 left-0 px-6 py-4 bg-gradient-to-t from-black to-gray-500">
                    <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">
                      {item.attributes.title}
                    </h4>
                    <p className="leading-normal text-gray-100">
                      {item.attributes.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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

const items = [
  {
    title: "Create your event",
    content:
      "Add your event details, set your budget, and purchase a unique code for your guests.",
  },
  {
    title: "Share your code",
    content:
      "Give your unique code to guests in advance with easy-to-follow instructions, made for your event.",
  },
  {
    title: "Treat your guests",
    content:
      "On the day of the event, your guests can request a ride in minutes using your unique code.",
  },
];
export default Event;
