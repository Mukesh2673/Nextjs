import Head from "next/head";
import { Footer } from "components";
import Link from "next/link";

function CookiePolicy() {
  return (
    <>
      <Head>
        <title>Pickmeup - Cookie Policy</title>
        <meta
          name="description"
          content="This is the Cookie Policy for Pickmeup, accessible from www.pickmeup.ng"
        />
      </Head>
      <div className="Document Page wrapper padding-x">
        <div className="Document-header title-wrapper w-full">
          <h2 className="title primary">Cookie Policy</h2>
          <article className="text">
            This is the Cookie Policy for Pickmeup, accessible from
            www.pickmeup.ng
          </article>
        </div>
        <div className="Document-description w-full flex flex-col items-center">
          <div className="Document-paragraph w-full">
            <h2 className="title tertiary">What Are Cookies?</h2>
            <article className="text">
              As is common practice with almost all professional websites this
              site uses cookies, which are tiny files that are downloaded to
              your computer, to improve your experience. This page describes
              what information they gather, how we use it and why we sometimes
              need to store these cookies. We will also share how you can
              prevent these cookies from being stored however this may downgrade
              or 'break' certain elements of the sites functionality.
            </article>
          </div>
          <div className="Document-paragraph w-full">
            <h2 className="title tertiary">How We Use Cookies</h2>
            <article className="text">
              We use cookies for a variety of reasons detailed below.
              Unfortunately in most cases there are no industry standard options
              for disabling cookies without completely disabling the
              functionality and features they add to this site. It is
              recommended that you leave on all cookies if you are not sure
              whether you need them or not in case they are used to provide a
              service that you use.
            </article>
          </div>
          <div className="Document-paragraph w-full">
            <h2 className="title tertiary">Disabling Cookies</h2>
            <article className="text">
              You can prevent the setting of cookies by adjusting the settings
              on your browser (see your browser Help for how to do this). Be
              aware that disabling cookies will affect the functionality of this
              and many other websites that you visit. Disabling cookies will
              usually result in also disabling certain functionality and
              features of the this site. Therefore it is recommended that you do
              not disable cookies.{" "}
            </article>
          </div>
          <div className="Document-paragraph w-full">
            <h2 className="title tertiary">The Cookies We Set</h2>
            <article className="text">
              <ul>
                <li>
                  <b>Orders processing related cookies</b> : This site offers
                  e-commerce or payment facilities and some cookies are
                  essential to ensure that your order is remembered between
                  pages so that we can process it properly.
                </li>

                <li>
                  <b>Forms related cookies</b> : When you submit data to through
                  a form such as those found on contact pages or comment forms
                  cookies may be set to remember your user details for future
                  correspondence.
                </li>
                <li>
                  <b>Site preferences cookies</b> : In order to provide you with
                  a great experience on this site we provide the functionality
                  to set your preferences for how this site runs when you use
                  it. In order to remember your preferences we need to set
                  cookies so that this information can be called whenever you
                  interact with a page is affected by your preferences.
                </li>
              </ul>
            </article>
          </div>
          <div className="Document-paragraph w-full">
            <h2 className="title tertiary">Third Party Cookies</h2>
            <article className="text">
              In some special cases we also use cookies provided by trusted
              third parties. The following section details which third party
              cookies you might encounter through this site.
              <ul>
                <li>
                  We use adverts to offset the costs of running this site and
                  provide funding for further development. The behavioural
                  advertising cookies used by this site are designed to ensure
                  that we provide you with the most relevant adverts where
                  possible by anonymously tracking your interests and presenting
                  similar things that may be of interest.
                </li>
              </ul>
            </article>
          </div>
          <div className="Document-paragraph w-full">
            <h2 className="title tertiary">More Information</h2>
            <article className="text">
              More Information However if you are still looking for more
              information then you can contact us through one of our preferred
              contact methods:
              <ul>
                <li>
                  Email us at{" "}
                  <a href="mailto:support@pickmeup.ng">support@pickmeup.ng</a>
                </li>
                <li>
                  Call us at{" "}
                  <a href="phone:+2347067558936">+234 706 755 8936</a>
                </li>
                <li>
                  Contact us from{" "}
                  <Link href="/support">
                    <a>our contact page.</a>
                  </Link>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </div>
      <div className="Careers Page for-section">
        <Footer />
      </div>
    </>
  );
}

export default CookiePolicy;
