import { Form, BannerForm } from "components";
import { useState } from "react";
import axios from "axios";

function ContactForm() {
  // This state is used to store form data.
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const submitForm = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(formData);
        axios
          .post("/api/contact", formData)
          .then((res) => {
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      }, 1000);
    });
  };

  return (
    <BannerForm
      title="Contact us"
      subTitle="You can use the following form to contact us directly. It takes few minutes but will help us get back to you quicker!"
    >
      <Form
        form={form}
        formName="Register"
        submit={submitForm}
        formData={formData}
        setFormData={setFormData}
        messages={messages}
      />
    </BannerForm>
  );
}

const messages = {
  fail: {
    title: "Whoops.. Something went wrong.",
    content: "Unfortunately, an error occurred. Please try again shortly.",
    retry: true, // displays a Try Again in failure
  },
  success: {
    title: "Message sent successfully",
    content:
      "Thank you for your message. We have received your message, and will get back to you ASAP!",
    retry: false,
  },
  button: {
    submitting: "Sending message...",
    normal: "Submit",
  },
  accept: <></>,
};

const form = [
  {
    type: "text",
    name: "fullName",
    label: "Full name",
    HTMLtype: "text",
    required: true,
    placeholder: "Your fullname *",
    minLength: 6,
    maxLength: 40,
    twoColumn: true,
  },
  {
    type: "email",
    name: "email",
    label: "Email",
    HTMLtype: "email",
    required: true,
    placeholder: "Enter your email *",
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
    placeholder: "80 000 000 0000 *",
    minLength: 2,
    maxLength: 20,
    twoColumn: true,
  },
  {
    type: "textarea",
    name: "message",
    label: "Message",
    HTMLtype: "textarea",
    required: true,
    placeholder: "Your message here *",
    minLength: 20,
    maxLength: 500,
    twoColumn: true,
  },
];

export default ContactForm;
