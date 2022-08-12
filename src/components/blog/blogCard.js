import { STRAPI_API_URL } from "lib/constants";
import { useRouter } from "next/router";
import React from "react";

const BlogCard = ({ item: { attributes, id } }) => {
  const route = useRouter();
  return (
    <div className="cursor-pointer" onClick={() => route.push(`/blog/${id}`)}>
      <img
        src={
          attributes?.image?.data?.attributes?.url
            ? `${STRAPI_API_URL}${attributes?.image?.data?.attributes?.url}`
            : "assets/blog/unsplash_8gWEAAXJjtI-2.png"
        }
        alt=""
        className="rounded w-full h-[400px] object-cover"
      />
      <div className="md:pr-12 mt-6">
        <p className="text mb-2">
          {attributes?.type} |{" "}
          {new Date(attributes?.publishedAt).toLocaleString()}
        </p>
        <h1 className="title text secondary alignLeft mb-4 text-left text-3xl">
          {attributes?.title}
        </h1>
        <p classnName="text mt-6 ">{attributes?.content.slice(0, 300)}</p>
        <div className="flex items-center gap-6 mt-6">
          <img
            src="/assets/blog/Ellipse 100.png"
            alt="Testimonial by The Pickmeup Management Team"
            className="h-16 w-16 rounded-full"
          />
          <div>
            <p className="text sub-title">{attributes?.author}</p>
            <p className="text"> Just Now</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
