import { Info, AppDownload } from "components/home";
import { Footer } from "components";
import { Landing } from "components/dispatcher";
import Head from "next/head";

function Dispatcher() {
  return (
    <>
      <Head>
        <title>Pickmeup Dispatcher - Taxi Dispatcher Software</title>
        <meta
          name="description"
          content="Pickmeup Dispatcher - Taxi Dispatcher Software - Web based dispatch software with no setup costs or special hardware."
        />
      </Head>
      <div className="Dispatcher Page wrapper">
        <Landing />
        <Info />
      </div>
      <div className="Dispatcher Page">
        <AppDownload />
        <Footer />
      </div>
    </>
  );
}

export default Dispatcher;
