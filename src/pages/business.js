import Head from "next/head";
import { Banner, Footer } from "components";
import { WhyUs, Info, AppDownload, Actions } from "components/home";
import {
  CorporateSection,
  HospitalitySection,
  Section,
} from "components/business";

function Business() {
  return (
    <>
      <div className="Business Page wrapper">
        <Head>
          <title>Pickmeup - Business</title>
          <meta
            name="description"
            content="Busines owners (hotels, transport, retreats,...etc) can 
		  now register their services on the app to avail special transportation
		  services powered by Pickmeup via the app. every business owner will 
		  be our Partner and being our Partner means growing your business."
          />
        </Head>
        <Banner
          title="Partner with Pickmeup"
          text="We're looking to expand our global reach by offering franchise opportunities of setting-up and running the local operations, and investing into the development of the market supported by our technology, brand, and know-how. 
			Are you interested?"
          noWrapper={true}
        ></Banner>
        <Section img={"/assets/business/business-Section1-1.png"}>
          <CorporateSection />
        </Section>
        <Section
          img={"/assets/business/business-Section2-1.png"}
          reversed={true}
        >
          <HospitalitySection />
        </Section>
        <WhyUs />
        <Info />
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

export default Business;
