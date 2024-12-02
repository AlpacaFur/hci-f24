import React, { useState } from "react";

interface Step3Props {
  assignmentTime: string;
  setAssignmentTime: React.Dispatch<React.SetStateAction<string>>;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

const Step3: React.FC<Step3Props> = ({

  setAssignmentTime,
  handleNextStep,
  handlePreviousStep,
}) => {
  // State to hold the time number and unit separately
  const [timeAmount, setTimeAmount] = useState<string>("");
  const [timeUnit, setTimeUnit] = useState<string>("");

  const handleTimeChange = () => {
    // Combine timeAmount and timeUnit into a string and set the assignmentTime
    if (timeAmount && timeUnit) {
      setAssignmentTime(`${timeAmount} ${timeUnit}`);
    }
  };

  return (
    <div className="step-container">
      <div className="inner-goop">
      <label>How early do you like to know about upcoming assignments?</label>
      <div className="time-inputs">
        <input
          type="number"
          value={timeAmount}
          onChange={(e) => setTimeAmount(e.target.value)}
          placeholder="e.g., 1"
          onBlur={handleTimeChange} // Trigger time update on blur
        />
        <select
          value={timeUnit}
          onChange={(e) => setTimeUnit(e.target.value)}
          onBlur={handleTimeChange} // Trigger time update on blur
        >
          <option value="">Select unit</option>
          <option value="day">day(s)</option>
          <option value="week">week(s)</option>
          <option value="month">month(s)</option>
        </select>
      </div>
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

export default Step3;
