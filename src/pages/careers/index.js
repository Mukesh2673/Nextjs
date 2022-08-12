import Head from "next/head";
import { Footer, Banner } from "components";
import { AppDownload, Actions } from "components/home";
import { Section } from "components/cities";
import { OpenRoles } from "components/careers";
import { useState, useEffect } from "react";
import { STRAPI_API_URL } from "lib/constants";
function Careers() {
  const [data, setData] = useState({});
  const getData = async () => {
    try {
      const res = await fetch(`${STRAPI_API_URL}/api/career`, {
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
      });
      const temp = await res.json();
      if (temp.data) {
        setData(temp.data);
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
      <Head>
        <title>Pickmeup - Careers</title>
        <meta
          name="description"
          content="Come build with us a new world where cities feel small again.
		  Where transportation and tech bring people together, instead of apart."
        />
      </Head>
      <div className="wrapper" style={{ paddingTop: "3rem" }}>
        <Section imgs={["/assets/careers/Image2.jpg"]} reversed={true}>
          <h3 className="title primary md:-mt-32">
            {data?.attributes?.title?.split(".")[0]}.
            <br />
            {data?.attributes?.title?.split(".")[1]}
          </h3>
          <p className="text">{data?.attributes?.description}</p>
        </Section>
      </div>
      <div className="Careers Page wrapper my-4">
        <Banner
          title={<>We go far as a team.</>}
          text="At Pickmeup we're reimagining the way the world moves for the
		  better. That means being bold in our decisions and building for
		  something bigger. For us, all of that starts with helping people go
		  anywhere and get anything: cars, takeout, motorcycles, groceries,
		  bikes, people, scooters, items, trucks, buses. It's what we know
		  and what we do best. And we do it at the speed of now That's why
		  people want to join us.
		  Because our solutions are implemented in real time and on thousands
		  of city streets, they are a boon and a career to people all over
		  the globe. The scope of this work means Pickmeup will challenge you
		  - put you up against complex problems that require ambitious solutions."
          noWrapper={true}
          classNameForTitle="items-center"
        />
        <OpenRoles />
      </div>
      <div className="Home Page for-section">
        <AppDownload />
      </div>
      <div className="Home Page for-section wrapper">
        <Actions />
      </div>
      <div className="Home Page for-section">
        <Footer />
      </div>
    </>
  );
}

export default Careers;
