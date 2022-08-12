import Head from "next/head";
import { StepNav } from "components/driver-signup";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { stepState, driverState } from "atoms/driver";
import { useRouter } from "next/router";
import { Form } from "components";
import manufacturers from "data/manufacturers.json";
import years from "data/years.json";
import colors from "data/colors.json";

function StepTwo({ step }) {
  // next.js router
  const router = useRouter();

  // getting global currentStep state
  const [currentStep, setCurrentStep] = useRecoilState(stepState);

  // driver global state
  const [driver, setDriver] = useRecoilState(driverState);

  // formData state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    lang: "English, US",
    referCode: "",
    vehicle_hasOne: true, // still needs checkmark
    vehicle_manufacturer: "ACE",
    vehicle_model: "",
    vehicle_year: "2022",
    vehicle_plate: "",
    vehicle_color: "Beige",
  });

  // going to next step
  const next = () => {
    return new Promise((resolve, reject) => {
      let nextStep = parseInt(step) + 1;

      setDriver((old) => {
        // cloning old driver
        let newDriver = { ...old };

        newDriver = {
          ...newDriver,
          firstName: formData.firstName,
          lastName: formData.lastName,
          lang: formData.lang,
          referCode: formData.referCode,
        };

        // if user doesn't have a vehicle
        // we stop here
        if (!formData.vehicle_hasOne) return newDriver;

        newDriver = {
          ...newDriver,
          vehicle: {
            hasOne: formData.vehicle_hasOne,
            manufacturer: formData.vehicle_manufacturer,
            model: formData.vehicle_model,
            year: formData.vehicle_year,
            plate: formData.vehicle_plate,
            color: formData.vehicle_color,
          },
        };

        return newDriver;
      });

      setCurrentStep(nextStep);

      router.push(`/driver/signup/${nextStep}`);

      resolve();
    });
  };

  const form = [
    {
      type: "firstName",
      name: "firstName",
      label: "First Name",
      subLabel: "First name is required",
      HTMLtype: "text",
      required: true,
      placeholder: "First name",
      minLength: 2,
      maxLength: 20,
      twoColumn: true,
    },
    {
      type: "lastName",
      name: "lastName",
      label: "Last Name",
      subLabel: "Last name is required",
      HTMLtype: "text",
      required: true,
      placeholder: "Last name",
      minLength: 2,
      maxLength: 20,
      twoColumn: true,
    },
    {
      type: "select",
      name: "lang",
      label: "Language",
      HTMLtype: "select",
      required: true,
      options: ["English, US", "English, UK", "French, France"],
      twoColumn: true,
    },
    {
      type: "referCode",
      name: "referCode",
      label: "Referral Code",
      subLabel: "If someone referred you, enter their code",
      HTMLtype: "text",
      required: false,
      placeholder: "Referral Code",
      minLength: 6,
      maxLength: 6,
      twoColumn: true,
    },
    {
      type: "checkbox",
      name: "vehicle_hasOne",
      label: "I have a vehicle that I will drive.",
      required: false,
      twoColumn: true,
    },
    {
      type: "select",
      name: "vehicle_manufacturer",
      label: "Vehicle Manufacturer",
      HTMLtype: "select",
      required: false,
      options: manufacturers,
      twoColumn: true,
      className: formData.vehicle_hasOne ? "" : "display-none",
    },
    {
      type: "text",
      name: "vehicle_model",
      label: "Vehicle Model",
      placeholder: "Vehicle Model",
      HTMLtype: "text",
      required: formData.vehicle_hasOne, // will be required if he has a vehicle
      twoColumn: true,
      className: formData.vehicle_hasOne ? "" : "display-none",
      minLength: 2,
      maxLength: 20,
    },
    {
      type: "select",
      name: "vehicle_year",
      label: "Vehicle Year",
      HTMLtype: "select",
      required: formData.vehicle_hasOne,
      options: years,
      twoColumn: true,
      className: formData.vehicle_hasOne ? "" : "display-none",
    },
    {
      type: "vehicle_plate",
      name: "vehicle_plate",
      label: "Vehicle Plate",
      HTMLtype: "text",
      required: formData.vehicle_hasOne,
      placeholder: "717 TTP",
      minLength: 6,
      maxLength: 20,
      twoColumn: true,
      className: formData.vehicle_hasOne ? "" : "display-none",
    },
    {
      type: "select",
      name: "vehicle_color",
      label: "Vehicle Color",
      HTMLtype: "select",
      required: formData.vehicle_hasOne,
      options: colors,
      twoColumn: true,
      className: formData.vehicle_hasOne ? "" : "display-none",
    },
  ];

  return (
    <div className="Step Page wrapper flex flex-col items-center row-gap w-full">
      <Head>
        <title>Sign up as a driver at Pickmeup - Step {step}</title>
      </Head>
      <StepNav />
      <div className="content flex flex-col align-center justify-start w-full">
        <div className="title flex flex-col text-center align-center w-full padding-x">
          <h1 className="title primary">
            Personal information and vehicle details
          </h1>
          <p className="text">
            Only your first name and vehicle details are visible to clients
            during the booking.
          </p>
        </div>
        <Form
          form={form}
          formName="StepTwo"
          submit={next}
          formData={formData}
          setFormData={setFormData}
          messages={messages}
        />
      </div>
    </div>
  );
}

export default StepTwo;

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
  accept: null,
};
