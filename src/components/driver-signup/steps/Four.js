import Head from "next/head";
import { StepNav, File } from "components/driver-signup";
import { useRecoilState } from "recoil";
import { stepState, driverState } from "atoms/driver";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Button from "components/global/Button";
import { MdArrowForward } from "react-icons/md";
import {
  setterExpiry,
  setterFile,
  checkErrors,
} from "lib/driver-signup/setters";
import { formatDate } from "lib/dates/formatDate";

let today = new Date();

let dayAfterTomorrow = today.setDate(today.getDate() + 1);

function Four({ step }) {
  // form data state
  const [formData, setFormData] = useState({
    driversLicense_file: null,
    driversLicense_expiry: formatDate(dayAfterTomorrow),
    profilePhoto_file: null,
    lasdriCard_file: null,
    driverBadge_file: null,
    driverBadge_expiry: formatDate(dayAfterTomorrow),
    lasrra_file: null,
  });

  // form error state
  const [error, setError] = useState({
    driversLicense_file: null,
    driversLicense_expiry: null,
    profilePhoto_file: null,
    lasdriCard_file: null,
    driverBadge_file: null,
    driverBadge_expiry: null,
    lasrra_file: null,
  });

  // driver global state
  const [driver, setDriver] = useRecoilState(driverState);

  // next.js router
  const router = useRouter();

  // getting global currentStep state
  const [currentStep, setCurrentStep] = useRecoilState(stepState);

  // global error
  const [globalError, setGlobalError] = useState(null);

  // button disable
  const [disabled, setDisabled] = useState(false);

  // going to next step
  const next = () => {
    return new Promise((resolve, reject) => {
      let nextStep = parseInt(step) + 1;

      setDriver({
        ...driver,
        documents: {
          driversLicense: {
            file: formData.driversLicense_file,
            expiry: formData.driversLicense_expiry,
          },
          profilePhoto: {
            file: formData.profilePhoto_file,
          },
          lasdriCard: {
            file: formData.lasdriCard_file,
          },
          driverBadge: {
            file: formData.driverBadge_file,
            expiry: formData.driverBadge_expiry,
          },
          lasrra: {
            file: formData.lasrra_file,
          },
        },
      });

      setCurrentStep(nextStep);

      router.push(`/driver/signup/${nextStep}`);

      resolve();
    });
  };

  const form = [
    {
      title: "Driver's license",
      required: true,
      expiry: {
        value: formData.driversLicense_expiry,
        name: "driversLicense_expiry",
        error: error.driversLicense_expiry,
        setter: (e) => {
          setGlobalError(null);
          setterExpiry(
            e,
            "driversLicense_expiry",
            formData,
            setFormData,
            error,
            setError
          );
        },
      },
      file: {
        value: formData.driversLicense_file,
        name: "driversLicense_file",
        maxSize: 2,
        extensions: ["pdf", "jpg", "jpeg"],
        setter: (e) => {
          setGlobalError(null);
          setterFile(
            e,
            "driversLicense_file",
            formData,
            setFormData,
            error,
            setError,
            ["pdf", "jpg", "jpeg"], // extension
            2 // max size in mb
          );
        },
        error: error.driversLicense_file,
      },
    },
    {
      title: "Driver's profile photo",
      description:
        "Please provide a clear portrait picture (not a full body picture) of yourself. It should show your full face, front view, with eyes open.",
      required: true,
      file: {
        value: formData.profilePhoto_file,
        name: "profilePhoto_file",
        maxSize: 1,
        extensions: ["jpg", "jpeg"],
        setter: (e) => {
          setGlobalError(null);
          setterFile(
            e,
            "profilePhoto_file",
            formData,
            setFormData,
            error,
            setError,
            ["jpg", "jpeg"], // extension
            1 // max size in mb
          );
        },
        error: error.profilePhoto_file,
      },
    },
    {
      title: "LASDRI Card",
      description:
        "<b>Lagos Drivers Institute ReCertification Card</b> Visit <a href='https://lasdri.org/' target='_blank' rel='noopener noreferrer'>Lagos State Drivers Institute</a>",
      className: driver.city != "Lagos" ? "display-none-important" : "",
      file: {
        value: formData.lasdriCard_file,
        name: "lasdriCard_file",
        maxSize: 2,
        extensions: ["pdf", "jpg", "jpeg"],
        setter: (e) => {
          setGlobalError(null);
          setterFile(
            e,
            "lasdriCard_file",
            formData,
            setFormData,
            error,
            setError,
            ["pdf", "jpg", "jpeg"], // extension
            2 // max size in mb
          );
        },
        error: error.lasdriCard_file,
      },
    },
    {
      title: "Driver Badge",
      description:
        "<b>Driver Badge Issued by the Lagos State Ministry of Transport's Department of Public Transport and Commuter Services</b> Visit <a href='https://transportation.lagosstate.gov.ng/responsibilities-2/' target='_blank' rel='noopener noreferrer'>LASG MoT Department of Public Transport and Commuter Services</a>",
      className: driver.city != "Lagos" ? "display-none-important" : "",
      expiry: {
        value: formData.driverBadge_expiry,
        name: "driverBadge_expiry",
        error: error.driverBadge_expiry,
        setter: (e) => {
          setGlobalError(null);
          setterExpiry(
            e,
            "driverBadge_expiry",
            formData,
            setFormData,
            error,
            setError
          );
        },
      },
      file: {
        value: formData.driverBadge_file,
        name: "driverBadge_file",
        maxSize: 2,
        extensions: ["pdf", "jpg", "jpeg"],
        setter: (e) => {
          setGlobalError(null);
          setterFile(
            e,
            "driverBadge_file",
            formData,
            setFormData,
            error,
            setError,
            ["pdf", "jpg", "jpeg"], // extension
            2 // max size in mb
          );
        },
        error: error.driverBadge_file,
      },
    },
    {
      title: "LASRRA Card",
      description:
        "<b>Resident Card Issued by the Lagos State Resident Registration Agency</b> Visit <a href='https://www.lagosresidents.gov.ng/' target='_blank' rel='noopener noreferrer'>Lagos State Resident Registration Agency</a>",
      className: driver.city != "Lagos" ? "display-none-important" : "",
      file: {
        value: formData.lasrra_file,
        name: "lasrra_file",
        maxSize: 2,
        extensions: ["pdf", "jpg", "jpeg"],
        setter: (e) => {
          setGlobalError(null);
          setterFile(
            e,
            "lasrra_file",
            formData,
            setFormData,
            error,
            setError,
            ["pdf", "jpg", "jpeg"], // extension
            2 // max size in mb
          );
        },
        error: error.lasrra_file,
      },
    },
  ];

  const submit = () => {
    return new Promise((resolve, reject) => {
      setGlobalError(null);
      if (!checkErrors(form, error, setError)) {
        reject("Error");
        router.push("#");
        return;
      }

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
          <h1 className="title primary">Documents</h1>
          <p className="text">
            We're legally required to ask you for some documents to sign up as
            driver. Document scans and quality photos are accepted.
          </p>
        </div>
        <div className="content-files-wrapper padding-x w-full flex flex-col row-gap">
          {globalError && (
            <div className={`content-global-error w-full`}>
              <p>{globalError}</p>
            </div>
          )}
          {form.map((item, i) => (
            <File
              key={i}
              title={item.title}
              description={item.description}
              required={item.required}
              expiry={item.expiry}
              file={item.file}
              className={item.className}
            />
          ))}
          <Button
            type="primary"
            disabled={disabled}
            onClick={() => {
              setDisabled(true);
              submit()
                .then(() => {
                  setGlobalError(null);
                  next();
                  setDisabled(false);
                })
                .catch(() => {
                  setGlobalError("One or more fields are invalid");
                  setDisabled(false);
                });
            }}
          >
            Continue
            <span>
              <MdArrowForward />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Four;
