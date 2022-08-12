import { useRecoilValue } from "recoil";
import { windowState } from "atoms/states";
import { Banner, Footer, BannerForm } from "components";
import {
  WhyUs,
  GetARide,
  Info,
  AppDownload,
  Actions,
  RideForm,
} from "components/home";
import Head from "next/head";
import HomeHeaderBanner from "components/home/Header";
import { useState, useEffect } from "react";
import { STRAPI_API_URL } from "lib/constants";
// App.tsx

import { LiveChatWidget } from '@livechat/widget-react'


/*
  DEV NOTE:
  Hey there! I'm Oussama (www.labrahmi.me)
  If you need any help with the code contact me.
  And Please check README.md before starting to read.
  Happy coding! Let's make Pickmeup the best
  ride-hailing platform on the planet!
*/

const img = {
  x3: "https://squid-app-ja5vm.ondigitalocean.app/uploads/main_page_281f6e01e8.jpeg",
  x2: "https://squid-app-ja5vm.ondigitalocean.app/uploads/main_page_281f6e01e8.jpeg",
  x1: "https://squid-app-ja5vm.ondigitalocean.app/uploads/main_page_mobile_png_d74f49d9e3.jpeg",
};

export default function Home() {
  // current screen width state
  const { width } = useRecoilValue(windowState);

  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const res = await fetch(`${STRAPI_API_URL}/api/home`, {
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
      });
      const temp = await res.json();
      if (temp.data) {
        setData(temp.data?.attributes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // banner img

  return (
    <>
      <div className="Home Page wrapper pt-0">
      <LiveChatWidget license="14404695" group="0" />
        <Head>
          <title>Pickmeup - Most Affordable Rides</title>
          <meta
            name="description"
            content="Pickmeup - The smartest way to move around in your city."
          />
        </Head>
        <HomeHeaderBanner title={data?.title1} text={data?.description1}>
          {/* <BannerForm
            title="Request a ride now"
            subTitle="Get wherever you need to go as quickly as possible."
          >
            <RideForm />
          </BannerForm> */}
        </HomeHeaderBanner>
        <WhyUs />
      </div>
      <div className="Home Page for-section">
        <GetARide />
      </div>
      <div className="Home Page for-section wrapper">
        <Info />
      </div>

      <div className="Home Page for-section wrapper">
        <Actions />
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
