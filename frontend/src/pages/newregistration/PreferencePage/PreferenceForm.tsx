import React, { useState } from "react";
import Step1 from "./Preference/Step1";
import Step2 from "./Preference/Step2";
import Step3 from "./Preference/Step3";
import Step4 from "./Preference/Step4"; // Import Step4
import Step5 from "./Preference/Step5"; // Import Step5

const PreferencesForm: React.FC = () => {
  const [step, setStep] = useState(1);

  // Define your state variables here
  // const [fromHours, setFromHours] = useState<string>("1");
  // const [fromMinutes, setFromMinutes] = useState<string>("00");
  // const [fromPeriod, setFromPeriod] = useState<string>("AM");
  // const [toHours, setToHours] = useState<string>("1");
  // const [toMinutes, setToMinutes] = useState<string>("00");
  // const [toPeriod, setToPeriod] = useState<string>("AM");

  const [studyHours, setStudyHours] = useState<number>(0);
  const [studyMinutes, setStudyMinutes] = useState<number>(0);
  const [breakMinutes, setBreakMinutes] = useState<number>(0);
  const [assignmentTime, setAssignmentTime] = useState<string>("");

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSkip = () => {
    setStep(5); // Directly set step to 5 when skipping
  };

  const handleLoginWithCanvas = () => {
    console.log("Logging in with Canvas...");
    // Add the login functionality here
  };

  const handleLoginWithGC = () => {
    console.log("Logging in with Google Calendar...");
    // Add the login functionality here
  };

  return (
    <div className="preferences-form">
      {step === 1 && (
        <Step1
          handleNextStep={handleNextStep} // Pass handleNextStep to Step1
        />
      )}
      {step === 2 && (
        <Step2
          studyHours={studyHours}
          studyMinutes={studyMinutes}
          breakMinutes={breakMinutes}
          setStudyHours={setStudyHours}
          setStudyMinutes={setStudyMinutes}
          setBreakMinutes={setBreakMinutes}
          handleNextStep={handleNextStep} // Pass handleNextStep to Step2
          handlePreviousStep={handlePreviousStep} // Pass handlePreviousStep to Step2
        />
      )}
      {step === 3 && (
        <Step3
          assignmentTime={assignmentTime}
          setAssignmentTime={setAssignmentTime}
          handleNextStep={handleNextStep} // Pass handleNextStep to Step3
          handlePreviousStep={handlePreviousStep} // Pass handlePreviousStep to Step3
        />
      )}
      {step === 4 && (
        <Step4
          handleLoginWithCanvas={handleLoginWithCanvas} // Pass handleLoginWithCanvas to Step4
          handlePreviousStep={handlePreviousStep} // Pass handlePreviousStep to Step4
          handleSkip={handleSkip}  // Pass handleSkip to Step4
        />
      )}
      {step === 5 && (
        <Step5
          handleLoginWithGC={handleLoginWithGC} // Pass handleLoginWithGC to Step5
          handlePreviousStep={handlePreviousStep} // Pass handlePreviousStep to Step5
          handleSkip={handleSkip}  // Pass handleSkip to Step5
        />
      )}
    </div>
  );
};

export default PreferencesForm;
