import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { MdArrowForward } from "react-icons/md";
import { BiRefresh } from "react-icons/bi";
import { useState } from "react";
import { Input, Button } from "components";
import { windowState } from "atoms/states";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import { useRouter } from "next/router";

/*
	This Form component is made to simplify forms in our
	website. Import it and add the following props with
	the syntax as explained, and it should be perfectly
	functional. If everything goes wrong, feel free to
	tweak it for extreme cases. If you're having problems
	contact me at labrahmioussama@gmail.com
  
	## form PROP
  
	The form prop is an array of objects, which will specify
	each input and its attributes, here is the interface for
	each object, every field is required except if it includes
	a '?' at the end of the name, then it's optional.
  
	{
	  name: string;
	  label?: string;
    subLabel?: string;
	  type: string;
	  HTMLtype: string;
	  required: boolean;
	  placeholder?: string;
	  minLength?: number;
	  maxLength?: number;
	  options?: string[]; // in the case of a select input
	  twoColumn?: boolean; // whether the input will take two columns or just one
	  // our form is in a grid layout of 2 columns.
	  fileRequirements?: {
		extension?: string; // needed extension for file
		maxSize?: number; // in megabytes
		fileType: string; // in the case of pdf : application/pdf
	  }
	}
  
	type and HTMLtype are not the same. HTMLtype represents
	the HTML 'type' attribute of the input (text, email...).
	The type prop represents the type of input for the Form
	component to understand (ex: textarea, select, text...)
  
	## formData PROP (with its setter)
  
	The formData prop is a state of type object that contains
	all the values of the inputs, the key of each input should
	be their name, for example :
  
	If you have an input in your form array (which we talked
	about above) with the name key being equal to 'firstName'
	your formData object should include a key 'firstName' that
	represents its value like :
	( formData = {
		firstName: "",
		lastName: "",
		... your other input state values
	  })
  
	## messages PROP
  
	  messages will specify the messages that get displayed to the user 
	  in the case of success, or failure. Here is its syntax :
  
	  const messages = {
		fail: {
		  title: "Whoops.. Something went wrong.",
		  content: "Unfortunately, an error occurred. Please try again shortly.",
		  retry: true // displays a Try Again button if true
		},
		success: {
		  title: "Signed up successfully",
		  content: "You have been signed up successfully. Check your email inbox to
			  confirm your account.",
		  retry: false
		},
		button: {
		  submitting: "Signing you up...", // button text on submitting
		  normal: "Sign up" // button text normally
		}
		// stuff to put under button, normally about accepting terms of service
		accept: <p>By signing up you agree to...</p>
	  }
  
	  ## submit PROP
  
	  submit prop is a promis that does something based on the formData state.
	  If resolved, the form displays success, or else it displays failure.
  
  
	  NOTE:
		IF YOU HAVE PASSWORD & CONFIRM PASSWORD INPUTS, NAME THEM 'password'
		AND 'confirmPassword' SO THAT THE FORM COMPONENT CHECKS IF THEY ARE
		SIMILAR OR NOT (AND DISPLAYS AN ERROR)
  */

const validEmail = (email) => {
  if (email.length < 8) return false;
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

const validPhone = (phone) => {
  if (phone.length <= 8) return false;
  return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phone);
};

function Form({
  form,
  formName,
  submit,
  formData,
  setFormData,
  messages,
  blackButton,
}) {
  const [error, setError] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const router = useRouter();
  const { width } = useRecoilValue(windowState);

  const typeOfInput = (name) => {
    for (let i = 0; i < form.length; i++) {
      if (form[i].name === name) {
        return form[i].type;
      }
    }
    return null;
  };

  const firstSelectItem = (name) => {
    for (let i = 0; i < form.length; i++) {
      if (form[i].name === name) {
        return form[i].options[0] || null; // if select array is empty, returns null
      }
    }
    return null;
  };

  const resetForm = () => {
    // reset values
    setFormData((old) => {
      // cloning old form data
      let newForm = { ...old };
      let keys = Object.keys(newForm);

      // looping through each key
      for (let i = 0; i < keys.length; i++) {
        let type = typeOfInput(keys[i]);
        if (!type) return old; // cancel if name is not in form array
        if (type === "file") {
          newForm[keys[i]] = null;
        } else if (type === "select") {
          newForm[keys[i]] = firstSelectItem(keys[i]) || "";
        } else {
          newForm[keys[i]] = "";
        }
      }

      // everything went well
      return newForm;
    });

    // reset errors
    setError((old) => {
      let newError = {};
      let keys = Object.keys(formData);

      for (let i = 0; i < keys.length; i++) {
        newError[keys[i]] = null;
      }

      newError.global = null;

      return newError;
    });

    // reset states
    setSubmitting(false);
    setSuccess(false);
    setFailure(false);
  };

  // specifies error of a selected input by name
  const raiseError = (name, errorValue) => {
    setError((old) => {
      // clone old errors
      const newError = JSON.parse(JSON.stringify(old));
      // edit needed value
      newError[name] = errorValue;
      // return new errors
      return newError;
    });
  };

  // checks if there's an error in some field
  const checkError = () => {
    // turns error object to array of values
    const allErrors = Object.values(error);

    // getting all input errors
    const inputKeys = Object.keys(formData);
    const inputValues = Object.values(formData);

    // iterates through each value, checks if its null
    for (let i = 0; i < allErrors.length; i++) {
      // if its not null, then there's an error, then checkError returns false
      if (allErrors[i] !== null) return false;
      if (inputKeys[i] === "email" && !validEmail(inputValues[i])) {
        raiseError(inputKeys[i], "Email is invalid.");
        return false;
      }
      if (inputKeys[i] === "phone" && !validPhone(inputValues[i])) {
        raiseError(inputKeys[i], "Phone number is invalid.");
        return false;
      }
    }
    // if all went well, returns true
    return true;
  };

  // this is the biggest function in the component,
  // its the function that gets executed whenever an
  // input is changed. It checks the cases of a phone input,
  // file input, select... etc. So if there is a case that
  // I haven't specified yet, please do! Thanks.
  const valueChange = (e, name, isFile) => {
    // true if we found an error in the input
    let foundError = false;

    // getting item from form array (props.form)
    const formItem = form.filter((item) => item.name === name)[0];

    // be positive! remove global error.
    raiseError("global", null);

    // we use the 'react-phone-input-2' npm package
    // for phone inputs, the new value is not e.target.value, but e itself.
    if (name === "phone") {
      if (formData[name] === e) return;

      setFormData((old) => ({ ...old, phone: e }));

      if (e === "" && formItem.required) {
        raiseError(name, "This field is required");
        foundError = true;
      } else if (!validPhone(e)) {
        raiseError(name, "Phone is invalid");
        foundError = true;
      } else {
        foundError = false;
        raiseError(name, null);
      }
      return;
    }

    if (name === "email") {
      if (formData[name] === e.target.value) return;

      setFormData((old) => ({ ...old, email: e.target.value }));

      if (e === "" && formItem.required) {
        raiseError(name, "This field is required");
        foundError = true;
      } else if (!validEmail(e.target.value)) {
        raiseError(name, "Email is invalid.");
        foundError = true;
      } else {
        foundError = false;
        raiseError(name, null);
      }
      return;
    }

    if (formItem.type === "checkbox") {
      // in a checkbox, the value is e.target.checked
      if (formData[name] === e.target.checked) return;

      setFormData((old) => {
        const newForm = { ...old };

        newForm[name] = e.target.checked;

        return newForm;
      });

      return;
    }

    if (formItem.type === "select") {
      // we are using the react-select package
      // on change, e.label is the value of the input
      // not e.target.value
      if (formData[name] === e.label) return;

      setFormData((old) => {
        const newForm = { ...old };

        newForm[name] = e.label;

        return newForm;
      });

      return;
    }

    // setting form data based on new value
    setFormData((old) => {
      // clone old form data
      const newForm = { ...old };
      // edit needed value
      if (isFile) {
        // case of a file input

        // if no files selected, change nothing
        if (!e.target.files[0]) return newForm;

        if (
          e.target.files[0].name.split(".").pop().toLowerCase() ===
            formItem.fileRequirements?.extension &&
          e.target.files[0].size / 1000000 <=
            formItem.fileRequirements?.maxSize &&
          e.target.files[0].type === formItem.fileRequirements?.type
        ) {
          // remove errors
          raiseError(name, null);
          foundError = false;
          // set file to formData
          newForm[name] = e.target.files[0];
        } else {
          if (
            e.target.files[0].size / 1000000 <=
            formItem.fileRequirements?.maxSize
          ) {
            // size is correct, so incorrect extension
            raiseError(name, "Incorrect Extension");
            foundError = true;
          } else {
            // extension correct, so size over limit
            raiseError(name, "Size is over 2MB");
          }
        }
      } else {
        // in the case of text, textarea, select
        newForm[name] = e.target.value;

        // length of new value entered, we trim it to get real
        // value without useless spaces
        const newValueLength = e.target.value.trim().length;

        if (newValueLength < formItem.minLength) {
          // if length is smaller than minLength specified
          raiseError(
            name,
            `Field must have at least ${formItem.minLength} characters. (${
              formItem.minLength - newValueLength
            } characters left)`
          );
          foundError = true;
        } else if (newValueLength > formItem.maxLength) {
          // if length is bigger than maxLength specified
          raiseError(
            name,
            `Field mustn't have more than ${
              formItem.maxLength
            } characters. (Remove ${
              newValueLength - formItem.maxLength
            } characters.)`
          );
          foundError = true;
        } else {
          // if length is between minLength and maxLength, then its good
          // remove errors.
          raiseError(name, null);
          foundError = false;
        }
      }

      // return new form
      return newForm;
    });

    // if error was found in file, return we do this to prventing
    // it to be reset to null in the line after the if statement below.
    if (isFile && error[name]) return;

    // Check if new value is empty, and required
    if (e.target.value === "" && formItem.required) {
      raiseError(name, "This field is required.");
      foundError = true;
      return;
    }

    if (!foundError) {
      raiseError(name, null);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    setSubmitting(true);
    raiseError("global", null);
    if (!checkError()) {
      router.push("#");
      raiseError("global", "One or more fields are invalid");
      setSubmitting(false);
      setSuccess(false);
      setFailure(false);
      return;
    }

    const submitPromise = submit();

    submitPromise // prop function that submits input
      .then(() => {
        setFailure(false);
        setSuccess(true);
        setSubmitting(false);
      })
      .catch((err) => {
        setFailure(true);
        setSuccess(false);
        setSubmitting(false);
        console.log(err);
      });
  };

  useEffect(() => {
    // sets errors state based on formData on mounted
    setError((old) => {
      // loops through each key in formData
      let newError = {};
      let keys = Object.keys(formData);

      for (let i = 0; i < keys.length; i++) {
        newError[keys[i]] = null;
      }

      // we have another error called global
      // which will be displayed above the form itself
      newError.global = null;

      return newError;
    });
  }, []);

  useEffect(() => {
    // whenever password or confirm password change we want to check
    // if they are equal.
    if (formData.password !== formData.confirmPassword) {
      raiseError("confirmPassword", "Passwords do not match!");
    } else {
      if (error.confirmPassword === "Passwords do not match!") {
        // we only want to turn it null if the error is that they dont match
        // in the case of any other error, just leave it.
        raiseError("confirmPassword", null);
      }
    }
  }, [formData.confirmPassword]);

  switch (true) {
    case failure:
      return (
        <div
          className={`${formName}-failure Form-failure flex flex-col items-center justify-center row-gap-s`}
        >
          <h1>
            <AiFillCloseCircle size={width > 768 ? 80 : 60} />
          </h1>
          <p className="title tertiary">{messages.fail.title}</p>
          <p className="text">{messages.fail.content}</p>
          {messages.fail.retry && (
            <Button type="secondary" onClick={resetForm}>
              <BiRefresh size="24" className="icon-margin" />
              Try again
            </Button>
          )}
        </div>
      );
    case success:
      return (
        <div
          className={`${formName}-success Form-success flex flex-col items-center justify-center row-gap-s`}
        >
          <h1>
            <AiFillCheckCircle size={width > 768 ? 80 : 60} />
          </h1>
          <p className="title tertiary">{messages.success.title}</p>
          <p className="text">{messages.success.content}</p>
          {messages.success.retry && (
            <Button type="secondary" onClick={resetForm}>
              <BiRefresh size="24" className="icon-margin" />
              Try again
            </Button>
          )}
        </div>
      );
    default:
      return (
        <form
          onSubmit={(e) => submitForm(e)}
          className={`${formName}-form Form-form flex flex-col row-gap w-full`}
        >
          {error.global && (
            <div className={`${formName}-global-error Form-global-error full`}>
              <p>{error.global}</p>
            </div>
          )}
          {form.map((input, i) => (
            <Input
              key={i}
              type={input.type}
              HTMLtype={input.HTMLtype}
              placeholder={input.placeholder}
              required={input.required}
              name={input.name}
              label={input.label}
              subLabel={input.subLabel}
              minLength={input.minLength}
              maxLength={input.maxLength}
              options={input?.options}
              value={
                formData[input.name] === null ? undefined : formData[input.name]
              }
              error={error[input.name]}
              onChange={(e) =>
                valueChange(e, input.name, input.HTMLtype === "file")
              }
              classNameContainer={`${input.className} ${
                input.twoColumn ? "full" : ""
              }`}
            />
          ))}
          <div className="button-wrapper full">
            <Button
              type={blackButton ? "dark" : "primary"}
              HTMLtype="submit"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <img src="/assets/loading.svg" alt="Loading..." height="20" />
                  {messages?.button?.submitting}
                </>
              ) : (
                <>
                  {messages?.button?.normal}
                  <span>
                    <MdArrowForward />
                  </span>
                </>
              )}
            </Button>
          </div>
          <div className="accept full">{messages?.accept}</div>
        </form>
      );
  }
}

export default Form;
