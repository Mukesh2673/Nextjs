import Head from "next/head";
import { Banner, Button, Footer } from "components";
import { AppDownload, Actions } from "components/home";
import { Testimonial } from "components/about";
import { Section } from "components/cities";
import { TiTick } from "react-icons/ti";
import { useState, useEffect } from "react";
import { STRAPI_API_URL } from "lib/constants";

const testimonials = [
  {
    content:
      "I move around the city a lot and usually to save my time I take a quick ride with Pickmeup. It is very fun for me to be a Pickmeup Ambassador and record videos during rides, share funny stories and always spread positivity, plus Pickmeup has awesome drivers along the way. This is for sure one of the best collaborations I have had so far!",
    author: "_tom.parsons",
  },
  {
    content:
      "I am very happy with the Program. It's amazing to work with a brand you and others can be proud of. Pickmeup understands the importance of balance, sustainability and safety. This is my first ambassador role and it's more than I could have ever imagined!",
    author: "claudia__",
  },
  {
    content:
      "I am a Pickmeup Ambassador because I'm really big on Pickmeup usage. I literally go everywhere and anywhere with Pickmeup and I derive joy from introducing my followers to the platform.",
    author: "renata.salvatore_",
  },
];
const images = [
  "/assets/ambassador/Image.png",
  "/assets/ambassador/Image-1.png",
  "/assets/ambassador/Image-2.png",
];
function Ambassador() {
  const [testimonials, setTestimonials] = useState([]);

  const getTestimonials = async () => {
    try {
      const res = await fetch(`${STRAPI_API_URL}/api/testimonials`, {
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
      });
      const temp = await res.json();
      if (temp.data) {
        setTestimonials(temp.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getTestimonials();
  }, []);
  return (
    <>
      <Head>
        <title>Pickmeup - Ambassador</title>
        <meta
          name="description"
          content="Pickmeup & associated services have been developed to combat 
            the current ride-hailing challenges faced by urban & rural users. 
            Designed with a simplistic UI for users with multi-language support, 
            Pickmeup is an all-rounded dependable platform for customers & drivers."
        />
      </Head>
      <div className="wrapper">
        <Section imgs={["/assets/manbg.png"]} reversed={true}>
          <h3 className="title primary md:-mt-32 mb-8">Ambassador Program</h3>
          <p className="text">
            Over 100 influencers are creating content for us on a long-term
            basis. Pickmeup is the leading transportation platform in Africa,
            focused on making urban travel easier, quicker and more reliable.
            Our services range from ride-hailing to micromobility and food
            delivery. Our mission is to make people's lives better by saving
            them time and money, reducing stress and improving cities. We're
            looking for social media influencers who can provide organic and
            authentic content. Check out our creative briefs for Pickmeup.
          </p>

          <Button type={"primary"} TMLtype="submit" className="my-6">
            Join Now
          </Button>
        </Section>
      </div>
      <div className="Home Page for-section">
        <div className="GetARide Section w-full padding-x">
          <div className="wrapper items-center w-full gap-24 pb-20">
            <h1 className="title primary mb-4">
              What our Ambassadors are saying...
            </h1>
            <p className="text mb-4 ">
              Listen to what they say about our product offerings.
            </p>
            <div className="flex items-center justify-around gap-12 flex-wrap">
              {testimonials.map((item, i) => (
                <div className="basis-1/2 md:basis-1/3" key={i}>
                  <div className="shadow rounded-md bg-white py-6 px-8 max-h-fit  h-fit min-h-[400px] flex justify-between flex-col">
                    <div>
                      <h3 className="title primary blue italic">"</h3>
                      <p className="text ">{item?.attributes?.description}</p>
                    </div>
                    <div className="author">
                      <p className="sub-title ">{item?.attributes?.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="Home Page for-section">
        {" "}
        <div className="wrapper items-center w-full  pb-20 text-center padding-x">
          <h1 className="title primary">You're the focus!</h1>
          <p className="text mb-12 text-center">
            We're looking for social media influencers who can provide organic
            and authentic content.
          </p>
          <div className="flex items-center-justify-between gap-12">
            {images.map((item, i) => (
              <div className="md:w-1/3 w-full" key={`Ambassador-Image-${i}`}>
                <img src={item} alt="image" className="w-full" />
              </div>
            ))}
          </div>
        </div>
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

const text =
  "Pickmeup came into existence at the time when ride-hailing services in Nigeria had just begun to boom. When we launched in 2019, we had just one goal - to build a 21st-century transport company to combat the current ride-hailing challenges faced by urban & rural users. Making fair, safe, and comfortable rides available to our customers became our priority. Over the years, we have grown with operation in seven major cities in Nigeria and over a thousand users daily. Our users - drivers and customers - enjoy our services which we are constantly improving on. Interestingly, we only got started - join us!";

export default Ambassador;
