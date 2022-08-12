import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { stepState } from "atoms/driver";
import {
  StepTwo,
  StepThree,
  StepFour,
  StepFive,
} from "components/driver-signup/steps";
import StepOne from "components/driver-signup/steps/One";

function Step({ step }) {
  // next.js router
  const router = useRouter();

  // getting global currentStep state
  const [currentStep, setCurrentStep] = useRecoilState(stepState);

  useEffect(() => {
    // checking if given step is currentStep
    if (parseInt(step) !== currentStep)
      router.push(`/driver/signup/${currentStep}`);
  });

  useEffect(() => {
    // hide header
    if (document.querySelector("div.Header .Header-content"))
      document.querySelector(
        "div.Header .Header-content"
      ).style.justifyContent = "center";
    if (document.querySelector("div.Header .Header-content .Header-Nav"))
      document.querySelector(
        "div.Header .Header-content .Header-Nav"
      ).style.display = "none";
    if (document.querySelector("div.Header .Header-content .Header-ham-menu"))
      document.querySelector(
        "div.Header .Header-content .Header-ham-menu"
      ).style.display = "none";
  }, []);

  switch (step) {
    case "1":
      return <StepOne step={step} />;
    case "2":
      return <StepTwo step={step} />;
    case "3":
      return <StepThree step={step} />;
    case "4":
      return <StepFour step={step} />;
    case "5":
      return <StepFive step={step} />;
  }
}

export default Step;

export async function getStaticPaths() {
  const paths = Array.from({ length: 5 }, (e, i) => ({
    params: {
      step: (i + 1).toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // if role wasnt found
  return {
    props: {
      step: params.step,
    },
  };
}
