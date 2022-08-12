import { useEffect, useState } from "react";
import roles from "data/roles.json";
import { Banner, Footer, Form } from "components";
import Head from "next/head";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from "axios";
import { STRAPI_API_URL } from "lib/constants";

export default function JobPost() {
  // importing next router
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

  // initializing form for job application
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "Nigeria",
    city: "",
    resume: null,
    whyHire: "",
  });

  const [uploadProgress, setUploadProgress] = useState(0);

  const submitForm = () => {
    return new Promise((resolve, reject) => {
      // we're going to send data to api using FormData()
      // since we can't send files as json without that.
      const data = new FormData();

      // run through each key in our formData state
      // and add that to our data FormData() variable.
      for (let i = 0; i < form.length; i++) {
        if (form[i].type === "file") {
          data.append(
            form[i].name,
            formData[form[i].name],
            formData[form[i].name].name
          );
        } else {
          data.append(form[i].name, formData[form[i].name]);
        }
      }
      data.append("roleId", job?.id);
      axios({
        method: "post",
        url: "/api/apply",
        data,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          setUploadProgress(Math.round((event.loaded * 100) / event.total));
        },
      })
        .then((res) => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const messages = {
    fail: {
      title: "Your application was not sent successfully",
      content: "Unfortunately, an error occurred. Please try again shortly.",
      retry: true, // displays a Try Again in failure
    },
    success: {
      title: "Your application was sent successfully",
      content: `Okay, ${formData.firstName}! Our team will get back to you as soon as possible.`,
      retry: false,
    },
    button: {
      submitting: `Uploading... (${uploadProgress}%)`,
      normal: "Send",
    },
    accept: <></>,
  };

  const form = [
    {
      name: "firstName",
      label: "First Name:",
      type: "text",
      HTMLtype: "text",
      placeholder: "First Name *",
      required: true,
      minLength: 2,
      maxLength: 20,
    },
    {
      name: "lastName",
      label: "Last Name:",
      type: "text",
      HTMLtype: "text",
      placeholder: "Last Name *",
      minLength: 2,
      maxLength: 20,
      required: true,
    },
    {
      name: "email",
      label: "Email:",
      type: "email",
      HTMLtype: "email",
      placeholder: "Email *",
      required: true,
      twoColumn: true,
    },
    {
      name: "phone",
      label: "Phone Number:",
      type: "phone",
      placeholder: "Phone Number *",
      minLength: 8,
      maxLength: 20,
      required: true,
      twoColumn: true,
    },
    {
      name: "country",
      label: "Country:",
      HTMLtype: "select",
      type: "select",
      options: ["Morocco", "Nigeria", "Somewhere else..."],
      minLength: 3,
      required: true,
      maxLength: 20,
      twoColumn: true,
    },
    {
      name: "city",
      label: "City :",
      HTMLtype: "text",
      placeholder: "City *",
      type: "text",
      minLength: 2,
      required: true,
      maxLength: 20,
      twoColumn: true,
    },
    {
      name: "resume",
      label: "Upload you resume: (only PDF files allowed, max 2MB)",
      HTMLtype: "file",
      type: "file",
      placeholder: "Your resume *",
      required: true,
      fileRequirements: {
        maxSize: 2, // in mb
        extension: "pdf",
        type: "application/pdf",
      },
      twoColumn: true,
    },
    {
      name: "whyHire",
      label: `${
        formData.firstName ? `And, ${formData.firstName}, w` : "W"
      }hy should we hire you?`,
      HTMLtype: "text",
      type: "textarea",
      required: true,
      placeholder: "Explain briefly why we should hire you *",
      minLength: 40,
      maxLength: 500,
      twoColumn: true,
    },
  ];

  if (!job) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="title secondary">
          Sorry, we weren't able to find the job you're looking for :(
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="JobPost Page wrapper">
        <Head>
          <title>Pickmeup Jobs - Apply to {job?.attributes?.name} job</title>
          <meta name="description" content={job?.attributes?.about} />
        </Head>
        <div className="Job w-full padding-x">
          <div className="back-link" id="scroll">
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
          <div className="JobApply">
            <div className="JobApply-header flex flex-col">
              <div className="title-wrapper">
                <p className="sub-title">The {job?.attributes?.team} team —</p>
                <h4 className="title secondary">{job?.attributes?.name}</h4>
              </div>
              <p className="title third">
                {job?.attributes?.location} • {job?.attributes?.time}
              </p>
              <p className="text">{job?.attributes?.description}</p>
            </div>
            <Form
              formName="JobApply"
              form={form}
              formData={formData}
              setFormData={setFormData}
              submit={submitForm}
              messages={messages}
              blackButton={true}
            />
          </div>
        </div>
      </div>
      <div className="JobPost Page for-section">
        <Footer />
      </div>
    </>
  );
}

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
