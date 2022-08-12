import Head from "next/head";
import { Banner, Footer } from "components";
import { AppDownload, Actions } from "components/home";
import { Testimonial } from "components/about";

import { useState, useEffect } from "react";
import { STRAPI_API_URL } from "lib/constants";
function About() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await fetch(`${STRAPI_API_URL}/api/about`, {
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
      });
      const temp = await res.json();
      if (temp.data) {
        setData(temp.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="About Page wrapper">
        <Head>
          <title>Pickmeup - About Us</title>
          <meta
            name="description"
            content="Pickmeup & associated services have been developed to combat 
            the current ride-hailing challenges faced by urban & rural users. 
            Designed with a simplistic UI for users with multi-language support, 
            Pickmeup is an all-rounded dependable platform for customers & drivers."
          />
        </Head>
        <Banner
          title={
            <>
              {data?.attributes?.heading1?.split(".")[0]}.
              <br />
              {data?.attributes?.heading1?.split(".")[1]}
            </>
          }
          wrapperClassName="hide-for-mobile"
        >
          <div className="right">
            <div className="right-top">
              <p className="text flex items-center justify-center">
                {data?.attributes?.description1}
              </p>
            </div>
            <div className="right-bottom">
              <img
                src={`${STRAPI_API_URL}/uploads/right_bottom_be9dc34023.png`}
                alt="Pickmeup"
                className="covered-img"
              />
            </div>
          </div>
          <div className="left">
            <div className="left-top">
              <img
                src={`${STRAPI_API_URL}/uploads/left_top_2748b69598.png`}
                alt="Pickmeup"
                className="covered-img"
              />
            </div>
            <div className="left-bottom">
              <img
                src={`${STRAPI_API_URL}/uploads/left_bottom_right_ddca1a46bb.png`}
                alt="Pickmeup"
                className="covered-img"
              />
            </div>
          </div>
        </Banner>
        <div className="MobileAboutSection w-full hide-for-desktop">
          <div className="MobileAboutSection-image">
            <img
              src={`${STRAPI_API_URL}/uploads/testimonial_205ec8ae93.png`}
              alt="Pickmeup"
              className="covered-img"
            />
          </div>
          <div className="MobileAboutSection-text padding-x">
            <p className="text">{data?.attributes?.description2}</p>
          </div>
        </div>
        <Banner
          title={data?.attributes?.heading2}
          text={data?.attributes?.description2}
          noWrapper={true}
          className="Section"
        />
        <Testimonial data={data?.attributes?.description3} />
      </div>
      <div className="Home Page for-section">
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

export default About;
