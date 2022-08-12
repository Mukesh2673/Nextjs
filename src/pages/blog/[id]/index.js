import { Footer } from "components";
import BlogCard from "components/blog/blogCard";
import { STRAPI_API_URL } from "lib/constants";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const SingleBlog = () => {
  const router = useRouter();

  const [blog, setBlog] = useState([]);

  const getSingleBlog = async () => {
    try {
      const res = await fetch(
        `${STRAPI_API_URL}/api/pickmeups/${router?.query?.id}?populate=*`,
        {
          // headers: {
          //   Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
          // },
        }
      );
      const temp = await res.json();
      if (temp.data) {
        setBlog(temp.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getSingleBlog();
  }, [router]);

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getData = async () => {
    try {
      const res = await fetch(`${STRAPI_API_URL}/api/pickmeups?populate=*`, {
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
      });
      const temp = await res.json();
      if (temp.data) {
        setData(temp.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Head>
        <title>Pickmeup Jobs - {blog?.attributes?.title}</title>
        <meta name="description" content={blog?.attributes?.content} />
      </Head>
      <div className="Job Page wrapper">
        <div className="mt-6 bg-gray-50">
          <div className=" px-10 py-6 mx-auto">
            <div className="max-w-6xl px-10 py-6 mx-auto bg-gray-50">
              <img
                className="object-cover w-full shadow-sm h-[70%] max-h-[400px]"
                src={
                  blog?.attributes?.image?.data?.attributes?.url
                    ? `${STRAPI_API_URL}${blog?.attributes?.image?.data?.attributes?.url}`
                    : "assets/blog/unsplash_8gWEAAXJjtI-2.png"
                }
              />

              <div className="mt-2">
                <p className="sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold">
                  {blog?.attributes?.title}
                </p>

                <div className="font-light text-gray-600">
                  <p className="flex items-center mt-6 mb-6">
                    <h1 className="font-bold text-gray-700 hover:underline">
                      By {blog?.attributes?.author}
                    </h1>
                  </p>
                </div>
              </div>
              <h1 className="font-semibold text-2xl">Description:</h1>
              <div className="max-w-full px-2  mx-auto text-xl text-justify text-gray-700 mt-4 rounded bg-gray-100">
                <div>
                  <p className="mt-2 p-8">
                    <ReactMarkdown>{blog?.attributes?.content}</ReactMarkdown>
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl my-4 mb-8 text-gray-500 font-bold text-center">
              Related Posts
            </h2>
            <div className="grid md:grid-cols-3 grid:cols-1 gap-8">
              {data?.slice(0, 3)?.map((item) => (
                <div className="col-span-1" key={item.id}>
                  <BlogCard item={item} key={item.id} />{" "}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="Job Page for-section">
        <Footer />
      </div>
    </>
  );
};

export default SingleBlog;
