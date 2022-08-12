import { StepNav } from "components/driver-signup";
import { Form } from "components";
import { useRecoilState } from "recoil";
import { driverState } from "atoms/driver";
import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";

function Five({ step }) {
  // form data state
  const [formData, setFormData] = useState({
    type: "Personal",
    fullName: "",
    address: "",
    bankHolderName: "",
    nubanNumber: "",
    bankName: "Access Bank Plc",
  });

  // driver global state
  const [driver, setDriver] = useRecoilState(driverState);

  // getting global currentStep state
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    setDriver({
      ...driver,
      payment: {
        type: formData.type,
        fullName: formData.fullName,
        address: formData.address,
        bankHolderName: formData.bankHolderName,
        nubanNumber: formData.nubanNumber,
        bankName: formData.bankName,
      },
    });
  }, [formData]);

  // sendingsubmitting driver to backend to be stored
  const submitDriver = () => {
    return new Promise((resolve, reject) => {
      // we're going to send data to api using FormData()
      // since we can't send files as json without that.
      const data = new FormData();

      // run through each key in our formData state
      // and add that to our data FormData() variable.
      const keys = Object.keys(driver);
      for (let i = 0; i < keys.length; i++) {
        if (["vehicle", "documents", "payment"].includes(keys[i])) {
          let subKeys = Object.keys(driver[keys[i]]);
          for (let j = 0; j < subKeys.length; j++) {
            if (keys[i] === "documents") {
              let subSubKeys = Object.keys(driver[keys[i]][subKeys[j]]);
              for (let k = 0; k < subSubKeys.length; k++) {
                if (subSubKeys[k] === "file") {
                  data.append(
                    `${keys[i]}_${subKeys[j]}_${subSubKeys[k]}`,
                    driver[keys[i]][subKeys[j]][subSubKeys[k]]
                  );
                } else {
                  data.append(
                    `${keys[i]}_${subKeys[j]}_${subSubKeys[k]}`,
                    driver[keys[i]][subKeys[j]][subSubKeys[k]]
                  );
                }
              }
            } else {
              data.append(
                `${keys[i]}_${subKeys[j]}`,
                driver[keys[i]][subKeys[j]]
              );
            }
          }
        } else {
          data.append(keys[i], driver[keys[i]]);
        }
      }

      axios({
        method: "post",
        url: "/api/driver",
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

  // going to next step
  const next = () => {
    return new Promise((resolve, reject) => {
      submitDriver()
        .then(() => {
          resolve("Driver submitted");
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };
  const messages = {
    fail: {
      title: "",
      content:
        "A fatal error occurred. Please wait a few minutes and retry your driver sign up submission. We apologize for the inconvenience.",
      retry: false, // displays a Try Again button upon failure
    },
    success: {
      title: "",
      content:
        "Vehicle Insection and Driver Training is mandatory. Proceed to any AutoGenius Center for Inspection.",
      retry: false,
    },
    button: {
      submitting: `Uploading... (${uploadProgress}%)`,
      normal: "Send",
    },
    accept: null,
  };

  return (
    <div className="Step Page wrapper flex flex-col items-center row-gap">
      <Head>
        <title>Sign up as a driver at Pickmeup - Step {step}</title>
      </Head>
      <StepNav />
      <div className="content flex flex-col align-center justify-start w-full padding-x">
        <div className="title flex flex-col text-center align-center w-full padding-x">
          <h1 className="title primary">Payment Details</h1>
          <p className="text">We need your payment details to pay you.</p>
        </div>
        <Form
          form={form}
          formName="StepFive"
          submit={next}
          formData={formData}
          setFormData={setFormData}
          messages={messages}
        />
      </div>
    </div>
  );
}

export default Five;

const form = [
  {
    type: "select",
    name: "type",
    label: "Billing Type",
    HTMLtype: "select",
    required: true,
    options: ["Personal"],
    twoColumn: true,
  },
  {
    type: "fullName",
    name: "fullName",
    label: "Full Name",
    subLabel: "Your full, legal name",
    HTMLtype: "text",
    required: true,
    placeholder: "Full name *",
    minLength: 6,
    maxLength: 40,
    twoColumn: true,
  },
  {
    type: "address",
    name: "address",
    label: "Address",
    HTMLtype: "text",
    required: true,
    placeholder: "Address *",
    minLength: 6,
    maxLength: 100,
    twoColumn: true,
  },
  {
    type: "bankHolderName",
    name: "bankHolderName",
    label: "Bank Account Holder Name",
    subLabel: "Bank account holder name, person",
    HTMLtype: "text",
    required: true,
    placeholder: "Bank Account Holder Name *",
    minLength: 6,
    maxLength: 40,
    twoColumn: true,
  },
  {
    type: "nubanNumber",
    name: "nubanNumber",
    label: "Nuban Account Number",
    subLabel: "Your 10 digits Nigerian Bank Accont Number",
    HTMLtype: "text",
    required: true,
    placeholder: "1234567890",
    minLength: 10,
    maxLength: 10,
    twoColumn: true,
  },
  {
    type: "select",
    name: "bankName",
    label: "Bank Name",
    HTMLtype: "select",
    required: true,
    options: [
      "Access Bank Plc",
      "Fidelity Bank Plc",
      "First City Monument Bank Limited",
      "First Bank of Nigeria Limited",
      "Guaranty Trust Holding Company Plc",
      "Union Bank of Nigeria Plc",
      "United Bank for Africa Plc",
      "Zenith Bank Plc",
      "Citibank Nigeria Limited",
      "Ecobank Nigeria",
      "Heritage Bank Plc",
      "Keystone Bank Limited",
      "Polaris Bank Limited",
      "Stanbic IBTC Bank Plc",
      "Standard Chartered",
      "Sterling Bank Plc",
      "Titan Trust Bank Limited",
      "Unity Bank Plc",
      "Wema Bank Plc",
      "Globus Bank Limited",
      "Parallex Bank Limited",
      "Providus Bank Limited",
      "SunTrust Bank Nigeria Limited",
    ],
    twoColumn: true,
  },
];
