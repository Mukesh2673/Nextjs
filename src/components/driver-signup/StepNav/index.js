import React from "react";
import { useRecoilValue } from "recoil";
import { stepState } from "atoms/driver";

function StepNav() {
  // importing step global state
  const currentStep = useRecoilValue(stepState);

  return (
    <div className="StepNav flex flex-col items-center row-gap-s w-full">
      <div className="StepNav-wrapper flex items-start justify-between w-full">
        {steps.map((step, i) => (
          <>
            <div
              className={`StepNav-step flex flex-col items-center row-gap ${
                currentStep > i + 1
                  ? "done"
                  : currentStep === i + 1
                  ? "current"
                  : ""
              }`}
            >
              <div className="StepNav-step-num">{i + 1}</div>
              <div className="StepNav-step-name text-center">{step}</div>
            </div>
            <div className="line flex-grow"></div>
          </>
        ))}
      </div>
    </div>
  );
}

const steps = [
  "Contact",
  "Personal & Vehicle Info",
  "Document Details",
  "Documents",
  "Payment Details",
];

export default StepNav;
