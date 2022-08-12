import roles from "data/roles.json";
import Head from "next/head";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdArrowForward } from "react-icons/md";
import { useRouter } from "next/router";
import { Button, Footer } from "components";
import { useState, useEffect } from "react";
import { STRAPI_API_URL } from "lib/constants";
import ReactMarkdown from "react-markdown";

function Job() {
  const router = useRouter();

  const [job, setJob] = useState([]);

  const getSingleRole = async () => {
    try {
      const res = await fetch(
        `${STRAPI_API_URL}/api/joblistings/${router?.query?.id}`,
        {
          // headers: {
          //   Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
          // },
        }
      );
      const temp = await res.json();
      if (temp.data) {
        setJob(temp.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getSingleRole();
  }, [router]);

  if (!job) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="title secondary">
          Sorry, we weren't able to find the job you're looking for :(
        </h1>
      </div>
    );
  }

  const paragraphs = [
    {
      title: "About the Role",
      text: job?.attributes?.about ? job?.attributes?.about : null,
    },
    {
      title: "About the Team",
      list: job?.attributes?.aboutTeam ? job?.attributes?.aboutTeam : null,
    },
    {
      title: "Minimum qualifications",
      list: job?.attributes?.qualifications
        ? job?.attributes?.qualifications
        : null,
    },
    {
      title: "Responsibilities",
      list: job?.attributes?.responsibilities
        ? job?.attributes?.responsibilities
        : null,
    },
    {
      title: "Requirements",
      list: job?.attributes?.requirements
        ? job?.attributes?.requirements
        : null,
    },
    {
      title: "Required skills",
      list: job?.attributes?.skills ? job?.attributes?.skills : null,
    },
    {
      title: "",
      text: job?.attributes?.description ? job?.attributes?.description : null,
    },
  ];

  return (
    <>
      <Head>
        <title>Pickmeup Jobs - {job?.attributes?.name}</title>
        <meta name="description" content={job?.attributes?.about} />
      </Head>
      <div className="Job Page wrapper">
        <div className="Job w-full padding-x">
          <div className="back-link">
            <div
              className="link flex items-center col-gap-s cursor-pointer"
              onClick={() => router.back()}
            >
              <span>
                <AiOutlineArrowLeft />
              </span>
              <p>Go back</p>
            </div>
          </div>
          <div className="Job-header title-wrapper w-full">
            <p className="sub-title"> {job?.attributes?.team} —</p>
            <h2 className="title secondary">{job?.attributes?.name}</h2>
            <Button
              type="dark"
              onClick={() => router.push(`/careers/apply/${job.id}`)}
            >
              Apply Now
              <span>
                <MdArrowForward />
              </span>
            </Button>
          </div>
          <div className="Job-description w-full flex flex-col items-center">
            {paragraphs?.map((paragraph, i) =>
              paragraph.text || paragraph.list ? (
                <div className="Job-paragraph w-full" key={i}>
                  <h2 className="title tertiary">{paragraph.title}</h2>
                  {paragraph.text && (
                    <article
                      className="text pl-0"
                      dangerouslySetInnerHTML={{ __html: paragraph.text }}
                    ></article>
                  )}
                  {paragraph.list && (
                    <>
                      <ReactMarkdown>{paragraph.list}</ReactMarkdown>
                    </>
                  )}
                </div>
              ) : (
                <></>
              )
            )}
          </div>
          <div className="Job-footer w-full">
            <Button
              type="dark"
              onClick={() => router.push(`/careers/apply/${job.id}`)}
            >
              Apply Now
              <span>
                <MdArrowForward />
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div className="Job Page for-section">
        <Footer />
      </div>
    </>
  );
}

export default Job;

// export async function getStaticPaths() {
//   const paths = roles.map((role) => ({
//     params: {
//       id: role.id,
//     },
//   }));
//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   // Fetch necessary data for the job post using params.id
//   let i = 0;

//   while (i < roles.length) {
//     // if role id was found
//     if (roles[i].id === params.id) {
//       // return it as props
//       return {
//         props: {
//           job: roles[i],
//         },
//       };
//     }
//     // else, keep iterating
//     i++;
//   }

//   // if role wasnt found
//   return {
//     props: {
//       job: null,
//     },
//   };
// }
