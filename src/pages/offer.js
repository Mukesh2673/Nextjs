import Head from "next/head";
import { Footer } from "components";
import { AppDownload, Actions } from "components/home";
import OfferInfo from "components/offer/info";
import { useState, useEffect } from "react";
import { STRAPI_API_URL } from "lib/constants";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import Accordion from "components/offer/Accordion";
function Offer() {
  const [offers, setOffers] = useState([]);
  const getOffers = async () => {
    try {
      const res = await fetch(`${STRAPI_API_URL}/api/offers`, {
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
      });
      const temp = await res.json();
      if (temp.data) {
        setOffers(temp.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOffers();
  }, []);

  return (
    <>
      <div className="About Page wrapper">
        <Head>
          <title>Pickmeup - Offer</title>
          <meta
            name="description"
            content="Pickmeup & associated services have been developed to combat 
            the current ride-hailing challenges faced by urban & rural users. 
            Designed with a simplistic UI for users with multi-language support, 
            Pickmeup is an all-rounded dependable platform for customers & drivers."
          />
        </Head>
        <OfferInfo />
      </div>
      <div className="Home Page for-section wrapper ">
        <div className="grid md:grid-cols-3 grid:cols-1 grid-row-4 gap-4 padding-x">
          {offers.map(({ attributes, id }) => (
            <Accordion data={attributes} key={id} />
          ))}
        </div>
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

export default Offer;
// <div className="col-span-1 row-span-1">
//     <div className="rounded border border-blue-400 py-6 px-6">
//       <p className="sub-title">New user Offer </p>
//       <p className="text">
//         Save Up To 70% OFF On Premium. No coupon code is required to get
//         the offer.
//       </p>
//     </div>
//   </div>
//   <div className="col-span-1 row-span-1">
//     <div className="rounded border border-blue-400 py-6 px-6">
//       <p className="sub-title">Referral</p>
//       <p className="text">
//         X% off (Can be 10%, 20%, 25%... etc basis customer cohort) up to
//         £1000 (Auto Apply)
//       </p>
//     </div>
//   </div>
//   <div className="row-span-2 col-span-1">
//     <div className="rounded border h-full bg-[#f0f5fe] border-blue-400 py-12 px-6 my-auto">
//       <p className="sub-title">Regular offers | Auto apply</p>
//       <p className="text">
//         X% off (Can be 10%, 20%, 25%... etc basis customer cohort) up to
//         £1000 (Auto Apply)
//       </p>
//       <p style={{ fontSize: "10px" }} className="mt-4">
//         **Get 50% cashback up to Rs 50 each ride on 3 rides per user.
//         The maximum discount is up to Rs 50 per ride. Offer is valid for
//         all users using paytm wallet. Promo code is applicable to
//         selected users
//       </p>
//     </div>
//   </div>
//   <div className="col-span-1 row-span-1">
//     <div className="rounded border border-blue-400 py-6 px-7">
//       <p className="sub-title">Referral</p>
//       <p className="text">
//         X% off (Can be 10%, 20%, 25%... etc basis customer cohort) up to
//         £1000 (Auto Apply)
//       </p>
//     </div>
//   </div>
//   <div className="col-span-1 row-span-1">
//     <div className="rounded border border-blue-400 py-6 px-6">
//       <p className="sub-title">Referral</p>
//       <p className="text">
//         X% off (Can be 10%, 20%, 25%... etc basis customer cohort) up to
//         £1000 (Auto Apply)
//       </p>
//     </div>
//   </div>
//   <div className="row-span-2 col-span-1">
//     <div className="rounded border bg-[#f0f5fe] border-blue-400 py-6 px-6">
//       <p className="sub-title">Regular offers | Auto apply</p>
//       <p className="text">
//         X% off (Can be 10%, 20%, 25%... etc basis customer cohort) up to
//         £1000 (Auto Apply)
//       </p>
//       <p style={{ fontSize: "10px" }} className="mt-4">
//         **Get 50% cashback up to Rs 50 each ride on 3 rides per user.
//         The maximum discount is up to Rs 50 per ride. Offer is valid for
//         all users using paytm wallet. Promo code is applicable to
//         selected users
//       </p>
//     </div>
//   </div>
//   <div className="col-span-1 row-span-1">
//     <div className="rounded border border-blue-400 py-6 px-6">
//       <p className="sub-title">New user Offer</p>
//       <p className="text">
//         Save Up To 70% OFF On Premium. No coupon code is required to get
//         the offer.
//       </p>
//     </div>
//   </div>

//   <div className="col-span-1 row-span-1">
//     <div className="rounded border border-blue-400 py-6 px-6">
//       <p className="sub-title">New user Offer </p>
//       <p className="text">
//         Save Up To 70% OFF On Premium. No coupon code is required to get
//         the offer.
//       </p>
//     </div>
//   </div>
//   <div className="col-span-1 row-span-1">
//     <div className="rounded border border-blue-400 py-6 px-6">
//       <p className="sub-title">New user Offer 10</p>
//       <p className="text">
//         Save Up To 70% OFF On Premium. No coupon code is required to get
//         the offer.
//       </p>
//     </div>
//   </div>
//   <div className="col-span-1 row-span-1">
//     <div className="rounded border border-blue-400 py-6 px-6">
//       <p className="sub-title">New user Offer</p>
//       <p className="text">
//         Save Up To 70% OFF On Premium. No coupon code is required to get
//         the offer.
//       </p>
//     </div>
//   </div>
