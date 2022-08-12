import Head from "next/head";
import { StepNav } from "components/driver-signup";
import { Form } from "components";
import { useRecoilState } from "recoil";
import { stepState, driverState } from "atoms/driver";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function StepThree({ step }) {
  // form data state
  const [formData, setFormData] = useState({
    driverLicenseNumber: "",
    hasTaxiLicense: false,
  });

  // driver global state
  const [driver, setDriver] = useRecoilState(driverState);

  // next.js router
  const router = useRouter();

  // getting global currentStep state
  const [currentStep, setCurrentStep] = useRecoilState(stepState);

  // going to next step
  const next = () => {
    return new Promise((resolve, reject) => {
      let nextStep = parseInt(step) + 1;

      setDriver({
        ...driver,
        driverLicenseNumber: formData.driverLicenseNumber,
        hasTaxiLicense: formData.hasTaxiLicense,
      });

      setCurrentStep(nextStep);

      router.push(`/driver/signup/${nextStep}`);

      resolve();
    });
  };

  return (
    <div className="Step Page wrapper flex flex-col items-center row-gap">
      <Head>
        <title>Sign up as a driver at Pickmeup - Step {step}</title>
      </Head>
      <StepNav />
      <div className="content flex flex-col align-center justify-start w-full">
        <div className="title flex flex-col text-center align-center w-full padding-x">
          <h1 className="title primary">Legal and Pricing details</h1>
          <p className="text">
            JTB Form and Temporary Driver License are Acceptable.
          </p>
        </div>
        <Form
          form={form}
          formName="StepThree"
          submit={next}
          formData={formData}
          setFormData={setFormData}
          messages={messages}
        />
      </div>
    </div>
  );
}

export default StepThree;

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
    normal: "Continue",
  },
  accept: null,
};

const form = [
  {
    type: "driverLicenseNumber",
    name: "driverLicenseNumber",
    label: "Driver License Number",
    subLabel: "License details are kept private",
    HTMLtype: "text",
    required: true,
    placeholder: "Driver License Number",
    minLength: 2,
    maxLength: 20,
    twoColumn: true,
  },
  {
    type: "checkbox",
    name: "hasTaxiLicense",
    label: "I don't have a taxi license.",
    required: false,
    twoColumn: true,
  },
];
