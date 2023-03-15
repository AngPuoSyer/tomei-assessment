import React from "react";

const steps = [
  "Create Your Account Password",
  "Personal Information",
  "Employment Details",
  "Upload Documents",
  "Complete",
];

const StepBar = (props: React.ComponentProps<any>) => {
  return (
    <div {...props}>
      <div className="justify-center hidden md:flex">
        {steps.map((val, index) => {
          return (
            <div className="">
              <div className="flex items-center">
                <img src={`/Wizard-Step${index + 1}.png`} />
                {index !== 4 && (
                  <img src={`/Wizard-HorizontalBar.png`} className="h-1" />
                )}
              </div>
              <div className="-ml-6 w-[120px] text-center font-semibold text-[#00000] text-base">
                <p className="my-4 font-bold">STEP{index + 1}:</p>
                <p className="font-semibold">{val.toUpperCase()}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="md:hidden w-full flex flex-col items-center">
        <div className="flex items-center">
          <img src={`/Wizard-Step1.png`} />
        </div>
        <div className=" w-[120px] text-center font-semibold text-[#00000] text-base">
          <p className="my-4 font-bold">STEP1:</p>
          <p className="font-semibold">Create Your Account Password</p>
        </div>
      </div>
    </div>
  );
};

export default StepBar;
