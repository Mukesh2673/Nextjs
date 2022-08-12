import Head from "next/head";
import { Banner } from "components";
import { useState, useEffect } from "react";
import { Section } from "components/cities";
import { Footer } from "components";
import { Actions, AppDownload } from "components/home";
import { STRAPI_API_URL } from "lib/constants";
import SectionContent from "components/cities/contents";
import { ToWords } from "to-words";

const images = [
  "/assets/cities/Cities-Section1-1.png",
  "/assets/cities/Cities-Section1-2.png",
  "/assets/cities/Cities-Section2-1.png",
  "/assets/cities/Cities-Section3-1.png",
];

function Cities() {
  const toWords = new ToWords();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const getData = async () => {
    try {
      const res = await fetch(`${STRAPI_API_URL}/api/cities`, {
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
      });
      const temp = await res.json();
      if (temp.data) {
        setCount(temp.data.length);
        let finalValue = [];
        for (let i = 0; i < Math.ceil(temp.data?.length); i += 2) {
          finalValue.push(
            <Section
              imgs={[images[i % images.length]]}
              reversed={i % 4}
              key={`City-${i}`}
            >
              <SectionContent
                firstCity={temp.data[i] ?? null}
                secondCity={temp.data[i + 1] ?? null}
              />
            </Section>
          );
        }
        setData(finalValue);
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
      <div className="Cities Page wrapper">
        <Head>
          <title>Pickmeup - Our Cities</title>
          <meta
            name="description"
            content="Pickmeup - With Pickmeup, your destination is at your 
          fingertips. Just open the app and enter where you want to go, 
          and a nearby driver will help you get there reliably."
          />
        </Head>
        <Banner
          title={`Today, Pickmeup is present in ${toWords
            .convert(count)
            ?.toLowerCase()} cities across the country.`}
          text={`Pickmeup operates in more than ${count}cities in Nigeria. With Pickmeup,
        your destination is at your fingertips. Just open the app and enter where
        you want to go, and a nearby driver will help you get there reliably.
        Pickmeup is a great way to make your travel plans stress-free. Request a
        ride on-demand or schedule one ahead of time, We're committed to making
        every trip with Pickmeup as safe as possible.`}
          noWrapper={true}
          classNameForTitle="items-center"
        />
        {data.map((item) => item)}
      </div>
      <div className="Cities Page">
        <AppDownload />
      </div>
      <div className="Cities Page for-section wrapper">
        <Actions />
      </div>
      <div className="Cities Page for-section">
        <Footer />
      </div>
    </>
  );
}

export default Cities;
