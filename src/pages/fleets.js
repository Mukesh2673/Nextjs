import Head from "next/head";
import { Banner, BannerForm, Footer } from "components";
import { AppDownload } from "components/home";
import OfferInfo from "components/offer/info";
import { windowState } from "atoms/states";

import { useRecoilValue } from "recoil";
import Link from "next/link";
import { FleetForm } from "components/fleets";
import FleetBannerForm from "components/fleets/fleetBanner";
const img = {
  x1: "/assets/driver/Driver-Banner.png",
  x2: "/assets/driver/Driver-Banner@2x.png",
  x3: "/assets/driver/Driver-Banner@3x.png",
};
function Offer() {
  const { width } = useRecoilValue(windowState);

  return (
    <>
      <div className="Driver Page wrapper">
        <Head>
          <title>Pickmeup - Fleets</title>
          <meta
            name="description"
            content="Pickmeup & associated services have been developed to combat 
            the current ride-hailing challenges faced by urban & rural users. 
            Designed with a simplistic UI for users with multi-language support, 
            Pickmeup is an all-rounded dependable platform for customers & drivers."
          />
        </Head>
        <Banner
          title="Add your Fleet to Pickmeup"
          text="Join today and start choosing the best ride requests that are guaranteed to make you money already tomorrow. Manage drivers, vehicles and documents."
          wrapperClassName="with-form"
        >
          <FleetBannerForm
            title="Fleet Owners"
            subTitle={
              <>
                Sign up here if you have multiple vehicles to add on the
                Pickmeup platform. If you are an individual driver,{" "}
                <Link href="/driver">signup as a driver here.</Link>
              </>
            }
          >
            <FleetForm />
          </FleetBannerForm>
          <img
            src={width > 1920 ? img.x3 : width > 768 ? img.x2 : img.x1}
            alt="Driver in a car"
            className="covered-img"
          />
        </Banner>
      </div>
      <div className="Home Page wrapper md:pb-10 mt-4 pt-4 md:mt-10">
        <OfferInfo />
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

export default Offer;
