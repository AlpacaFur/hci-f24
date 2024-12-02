// Step2.tsx
import React from "react";

interface Step2Props {
  studyHours: number;
  studyMinutes: number;
  breakMinutes: number;
  setStudyHours: React.Dispatch<React.SetStateAction<number>>;
  setStudyMinutes: React.Dispatch<React.SetStateAction<number>>;
  setBreakMinutes: React.Dispatch<React.SetStateAction<number>>;
  handleNextStep: () => void; // Renamed nextStep to handleNextStep
  handlePreviousStep: () => void; // Renamed previousStep to handlePreviousStep
}

const Step2: React.FC<Step2Props> = ({
  studyHours,
  studyMinutes,
  breakMinutes,
  setStudyHours,
  setStudyMinutes,
  setBreakMinutes,
  handleNextStep,
  handlePreviousStep,
}) => {
  return (
    <div className="step-container">
      <div className="inner-goop">
      <label>How long do you like to study for at one time?</label>
      <div className="time-input">
        <div className="time-box">
          <label>Hours</label>
          <select
            value={studyHours}
            onChange={(e) => setStudyHours(Number(e.target.value))}
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div className="time-box">
          <label>Minutes</label>
          <select
            value={studyMinutes}
            onChange={(e) => setStudyMinutes(Number(e.target.value))}
          >
            <option value={0}>00</option>
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={45}>45</option>
            <option value={60}>60</option>
          </select>
        </div>
      </div>
      <label>How long of a break after studying?</label>
      <select
        value={breakMinutes}
        onChange={(e) => setBreakMinutes(Number(e.target.value))}
      >
        <option value={5}>5 minutes</option>
        <option value={10}>10 minutes</option>
        <option value={15}>15 minutes</option>
        <option value={20}>20 minutes</option>
      </select>
      </div>
      <div className="buttons">
        <button onClick={handlePreviousStep} className="back-button">
          Back
        </button>
        <button onClick={handleNextStep} className="next-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2;
