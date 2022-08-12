import { Form } from "components";
import { useState } from "react";

function RideForm() {
  // formData state
  const [formData, setFormData] = useState({
    pickup: "",
    destination: "",
  });

  const submitForm = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(formData);
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="RideForm w-full flex flex-col items-center hide-for-mobile">
      <Form
        form={form}
        formName="Register"
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
    content: "We found you someone who could take you to your destination!",
    retry: false,
  },
  button: {
    submitting: "Processing...",
    normal: "Request now",
  },
  accept: null,
};

const form = [
  {
    type: "pickup",
    name: "pickup",
    label: "Pickup",
    HTMLtype: "text",
    required: true,
    placeholder: "Enter pickup location",
    minLength: 2,
    maxLength: 20,
    twoColumn: true,
  },
  {
    type: "destination",
    name: "destination",
    label: "Destination",
    HTMLtype: "text",
    required: true,
    placeholder: "Enter destination",
    minLength: 2,
    maxLength: 20,
    twoColumn: true,
  },
];

export default RideForm;
