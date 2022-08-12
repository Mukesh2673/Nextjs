import Head from "next/head";
import { StepNav } from "components/driver-signup";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { stepState, driverState } from "atoms/driver";
import { useRouter } from "next/router";
import { Form } from "components";
import Link from "next/link";

function StepOne({ step }) {
  // next.js router
  const router = useRouter();

  // getting global currentStep state
  const [currentStep, setCurrentStep] = useRecoilState(stepState);

  // driver global state
  const [driver, setDriver] = useRecoilState(driverState);

  // formData state
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    city: "Abuja",
  });

  // going to next step
  const next = () => {
    return new Promise((resolve, reject) => {
      let nextStep = parseInt(step) + 1;

      setDriver({
        ...driver,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
      });

      setCurrentStep(nextStep);

      router.push(`/driver/signup/${nextStep}`);

      resolve();
    });
  };

  return (
    <div className="Step Page wrapper flex flex-col items-center row-gap w-full">
      <Head>
        <title>Sign up as a driver at Pickmeup - Step {step}</title>
      </Head>
      <StepNav />
      <div className="content flex flex-col align-center justify-start w-full">
        <div className="title flex flex-col text-center align-center w-full padding-x">
          <h1 className="title primary">Get started with Pickmeup</h1>
          <p className="text">
            Turn your vehicle into a money making machine and earn big while
            driving.
          </p>
        </div>
        <Form
          form={form}
          formName="StepOne"
          submit={next}
          formData={formData}
          setFormData={setFormData}
          messages={messages}
        />
      </div>
    </div>
  );
}

export default StepOne;

const messages = {
  fail: {
    title: "",
    content: "",
    retry: false, // displays a Try Again button upon failure
  },
  success: {
    title: "",
    content: "Please wait while we redirect you to the next step.",
    retry: false,
  },
  button: {
    submitting: "Processing...",
    normal: "Next",
  },
  accept: (
    <div style={{ margin: "-0.5rem 0 1.5rem" }}>
      By clicking Sign Up, you agree to Pickmeup's{" "}
      <Link href="/tos">
        <a>Terms of Use</a>
      </Link>{" "}
      and acknowledge you have read the{" "}
      <Link href="/privacy-policy">
        <a>Privacy Policy</a>
      </Link>
    </div>
  ),
};

const form = [
  {
    type: "email",
    name: "email",
    label: "Email",
    HTMLtype: "email",
    required: true,
    placeholder: "Enter your email",
    minLength: 6,
    maxLength: 40,
    twoColumn: true,
  },
  {
    type: "phone",
    name: "phone",
    label: "Phone",
    HTMLtype: "phone",
    required: true,
    placeholder: "80 000 000 0000",
    minLength: 2,
    maxLength: 20,
    twoColumn: true,
  },
  {
    type: "select",
    name: "city",
    label: "City",
    HTMLtype: "select",
    required: true,
    placeholder: "Choose a city",
    options: [
      "Abuja",
      "Asaba",
      "Benin City",
      "Calabar",
      "Lagos",
      "Port-Harcourt",
      "Uyo",
      "Warri",
    ],
    twoColumn: true,
  },
];
