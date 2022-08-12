import Head from "next/head";
import { Banner, BannerForm } from "components";
import { DriverForm, WhyDrive } from "components/driver";
import { useRecoilValue } from "recoil";
import { windowState } from "atoms/states";
import { Info, AppDownload } from "components/home";
import { Footer } from "components";

const img = {
  x1: "/assets/driver/Driver-Banner.png",
  x2: "/assets/driver/Driver-Banner@2x.png",
  x3: "/assets/driver/Driver-Banner@3x.png",
};

function Driver() {
  // width global state
  const { width } = useRecoilValue(windowState);

  return (
    <>
      <div className="Driver Page wrapper">
        <Head>
          <title>Pickmeup - Register as a driver</title>
          <meta
            name="description"
            content="Pickmeup -  Register as a driver at Pickmeup. Fill the
			form, download the app, start driving and get paid!"
          />
        </Head>
        <Banner
          title="Start making more money with Pickmeup"
          text="Join today and start choosing the best ride requests that are
            guaranteed to make you money already tomorrow. Be your own boss, set
            your own time and earn when you like."
          wrapperClassName="with-form"
        >
          <BannerForm
            title="Get started with Pickmeup"
            subTitle="Turn your vehicle into a money making machine and earn big while driving."
          >
            <DriverForm />
          </BannerForm>
          <img
            src={width > 1920 ? img.x3 : width > 768 ? img.x2 : img.x1}
            alt="Driver in a car"
            className="covered-img "
          />
        </Banner>
        <WhyDrive />
        <Info />
      </div>
      <div className="Home Page for-section">
        <AppDownload />
      </div>
      <Footer />
    </>
  );
}

export default Driver;
