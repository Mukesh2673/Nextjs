import Head from "next/head";
import { Footer } from "components";
import { AppDownload, Actions } from "components/home";
import BlogCard from "components/blog/blogCard";
import { useState, useEffect } from "react";
import { STRAPI_API_URL } from "lib/constants";

export default function About() {
  const [data, setData] = useState({
    allData: [],
    toShowData: [],
  });
  const [searchText, setSearchText] = useState("");

  const getData = async () => {
    try {
      const res = await fetch(`https://www.pickmeup.ng/wp-json/wp/v2/posts?_embed&per_page=18&_fields[]=id&_fields[]=title&_fields[]=link&_fields[]=excerpt&_fields[]=_links.wp:featuredmedia&page=1`, {
       /*  headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        }, */
      });
      const temp = await res.json();
      console.log(temp)
      if (temp) {
        setData({
          toShowData: temp,
          allData: temp,
        });
      }
    } catch (err) {
      console.log(err);
    }


  };


  useEffect(() => {
    getData();
  }, []);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (searchText) {
            const filteredData = data.allData.filter((item) =>{
        return item.title.rendered.toLowerCase().includes(searchText.toLowerCase());
      });
    setData({ ...data, toShowData: filteredData });
    } else {
      setData({ ...data, toShowData: data.allData });
    }
  }, [searchText]);
  return (
    <>
      <div className="About Page wrapper">
        <Head>
          <title>Pickmeup - Blog</title>
          <meta
            name="description"
            content="Pickmeup & associated services have been developed to combat 
            the current ride-hailing challenges faced by urban & rural users. 
            Designed with a simplistic UI for users with multi-language support, 
            Pickmeup is an all-rounded dependable platform for customers & drivers."
          />
        </Head>
        <div className="w-full">
          <div
            className=" padding-x flex flex-col
		items-center row-gap "
          >
            <div className=" flex flex-col items-center w-full">
              <h1 className="title primary">Get The Latest News </h1>
              <p className="text md:text-center my-4 md:w-2/3 w-full">
                Discover the latest development in our ride-hailing services. We
                provide easy web and mobile transportation, flexible ride
                options, transparent pricing, real-time tracking and
                confirmations.
              </p>
              <div className="flex justify-center md:w-1/3 w-full ">
                <div className="mb-3 w-full">
                  <div className="input-group relative flex  items-stretch w-full mb-4">
                    <input
                      type="search"
                      className="form-control relative flex-auto min-w-0 block w-full px-6 py-1.5 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Search Blog ..."
                      aria-label="Search"
                      aria-describedby="button-addon2"
                      value={searchText}
                      onChange={handleSearchChange}
                    />
                    <button
                      className=" px-6 py-4 border-l-0 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-r-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                      type="button"
                      id="button-addon2"
                    >
                      Go
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="Section w-full padding-x">
          <div className="grid md:grid-cols-7 grid-cols-1 items-center">
            <div className="md:col-span-4">
              <img
                src="/assets/blog/carBlog.png"
                alt="Testimonial by The Pickmeup Management Team"
                className="w-full"
              />
            </div>
            <div className="col-span-3 md:px-20 px-0">
              <p className="text mb-4">Product Update | April 20, 2022</p>
              <h1 className="title text alignLeft tertiary mb-6">
                App Update: add extra stops to your Pickmeup ride
              </h1>
              <p className="text mt-8">
                Need to make a stop on your way or share your Pickmeup ride with
                friends? No more switching destinations mid-journey, you can now
                add extra stops before getting a ride!...
              </p>
              <div className="flex items-center gap-6 mt-6">
                <img
                  src="/assets/blog/Ellipse 100.png"
                  alt="Testimonial by The Pickmeup Management Team"
                  className="h-16 w-16 rounded-full"
                />
                <div>
                  <p className="text sub-title">Jane Cooper</p>
                  <p className="text"> Just Now</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="Cities Page for-section wrapper">
        <div className="section w-full padding-x">
          <div className="grid md:grid-cols-3 grid:cols-1 gap-8">
            {data?.toShowData?.map((item) => (
              <div className="col-span-1" key={item.id}>
                <BlogCard item={item} key={item.id} />
              </div>
            ))}
          </div>
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
