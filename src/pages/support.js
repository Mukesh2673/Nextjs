import { Banner, Footer } from "components";
import Head from "next/head";
import { ContactForm, FAQ, Help } from "components/support";
import { AppDownload, Actions } from "components/home";

function Support() {
  return (
    <>
      <Head>
        <title>Pickmeup - Contact Us</title>
        <meta
          name="description"
          content="Pickmeup - You can use the following form to contact us
		      directly. It takes few minutes but will help us get back to you quicker!"
        />
      </Head>
      <div className="Support Page wrapper">
        <Banner wrapperClassName="with-form">
          <ContactForm />
          <img src="/assets/support/banner.jpg" alt="Support" />
        </Banner>
        <FAQ />
        <Help />
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

export default Support;
