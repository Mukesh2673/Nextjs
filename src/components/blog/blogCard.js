import { STRAPI_API_URL } from "lib/constants";
import { useRouter } from "next/router";
import React from "react";

const BlogCard = ({ item,attributes}) => {
  const route = useRouter();
  return (
    <div className="cursor-pointer" onClick={() => route.push(`/blog/${item.id}`)}>
      <img
        src={
          item._embedded['wp:featuredmedia'][0].source_url
        }
        alt=""
        className="rounded w-full h-[400px] object-cover"
      />
      <div className="md:pr-12 mt-6">
        <p className="text mb-2">
          {/*           {attributes?.type} |{" "}
          {new Date(attributes?.publishedAt).toLocaleString()}
           */
            item?.title.rendered
           }
        </p>
        <p className="title">
           by |{new Date(item._embedded['wp:featuredmedia'][0].date).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
