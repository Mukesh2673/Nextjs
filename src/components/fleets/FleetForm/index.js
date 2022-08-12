import { Form } from "components";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { driverState } from "atoms/driver";
import { stepState } from "atoms/driver";

function FleetForm() {
  // getting global currentStep state
  const [currentStep, setCurrentStep] = useRecoilState(stepState);

  //next.js router
  const router = useRouter();

  // driver global state
  const [driver, setDriver] = useRecoilState(driverState);

  // formData state
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    vehicles: null,
  });

  const submitForm = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setCurrentStep(2);
        router.push("/");
        setDriver({
          ...driver,
          email: formData.email,
          phone: formData.phone,
          vehicles: formData.vehicles,
        });
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="DriverForm w-full flex flex-col items-center">
      <Form
        form={form}
        formName="Register Fleet Owners"
        submit={submitForm}
        formData={formData}
        setFormData={setFormData}
        messages={messages}
      />
    </div>
  );
}

const messages = {
  fail: {
    title: "Whoops.. Something went wrong.",
    content: "Unfortunately, an error occurred. Please try again shortly.",
    retry: true, // displays a Try Again button upon failure
  },
  success: {
    title: "Success",
    content: "Okay, you will be redirected to the driver register page.",
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
    placeholder: "your@gmail.com",
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
    name: "vehicles",
    label: "Vehicles in your fleet",
    HTMLtype: "select",
    required: true,
    placeholder: "1-10",
    options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    twoColumn: true,
  },
];

export default FleetForm;
