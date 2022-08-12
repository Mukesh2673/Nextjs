import { Banner, Footer } from "components";
import { WhyFranchise, ReadySection } from "components/franchise";
import { Actions, AppDownload, Info } from "components/home";
import Head from "next/head";

function Franchise() {
  return (
    <>
      <div className="Franchise Page wrapper">
        <Head>
          <title>Pickmeup - Franchise</title>
          <meta
            name="description"
            content="We're looking to expand our global reach by offering franchise opportunities of setting-up and running the local operations, and investing into the development of the market supported by our technology, brand, and know-how. Are you interested?"
          />
        </Head>
        <Banner
          title="Become a Pickmeup Franchise"
          text="As a way of contributing to the ride-hailing industry, we give businesses the opportunity to become Pickmeup franchise with Growth-inclined policies and support."
          className="h-[650px]"
        >
          <img
            src="/assets/franchise/Banner.png"
            alt="Franchise Banner"
            className="h-[500px] w-full object-cover rounded-none"
          />
        </Banner>
        <WhyFranchise />
      </div>
      <div className="Home Page for-section">
        <ReadySection />
      </div>
      <div className="Home Page for-section wrapper">
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

export default Franchise;
