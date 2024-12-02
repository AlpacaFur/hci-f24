import React from "react";
import { useNavigate } from "react-router-dom";
interface Step1Props {
  fromHours: string;
  fromMinutes: string;
  fromPeriod: string;
  toHours: string;
  toMinutes: string;
  toPeriod: string;
  setFromHours: React.Dispatch<React.SetStateAction<string>>;
  setFromMinutes: React.Dispatch<React.SetStateAction<string>>;
  setFromPeriod: React.Dispatch<React.SetStateAction<string>>;
  setToHours: React.Dispatch<React.SetStateAction<string>>;
  setToMinutes: React.Dispatch<React.SetStateAction<string>>;
  setToPeriod: React.Dispatch<React.SetStateAction<string>>;
  handleNextStep: () => void;
}

const Step1: React.FC<Step1Props> = ({
  fromHours,
  fromMinutes,
  fromPeriod,
  toHours,
  toMinutes,
  toPeriod,
  setFromHours,
  setFromMinutes,
  setFromPeriod,
  setToHours,
  setToMinutes,
  setToPeriod,
  handleNextStep,
}) => {
  const navigate = useNavigate();
  function backOne(): void {
    navigate("/create-user");
  }

  return (
    <div className="step-container">
      <label>What are your working hours?</label>
      <div className = "inner-goop">
      {/* From Time */}
      <div className="time-inputs">
        <label>From</label>
        <select value={fromHours} onChange={(e) => setFromHours(e.target.value)}>
          {[...Array(12).keys()].map((i) => (
            <option key={i} value={(i + 1).toString()}>
              {i + 1}
            </option>
          ))}
        </select>
        <select value={fromMinutes} onChange={(e) => setFromMinutes(e.target.value)}>
          {[...Array(60).keys()].map((i) => (
            <option key={i} value={i.toString().padStart(2, "0")}>
              {i.toString().padStart(2, "0")}
            </option>
          ))}
        </select>
        <select value={fromPeriod} onChange={(e) => setFromPeriod(e.target.value)}>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>

      {/* To Time */}
      <div className="time-inputs">
        <label>To</label>
        <select value={toHours} onChange={(e) => setToHours(e.target.value)}>
          {[...Array(12).keys()].map((i) => (
            <option key={i} value={(i + 1).toString()}>
              {i + 1}
            </option>
          ))}
        </select>
        <select value={toMinutes} onChange={(e) => setToMinutes(e.target.value)}>
          {[...Array(60).keys()].map((i) => (
            <option key={i} value={i.toString().padStart(2, "0")}>
              {i.toString().padStart(2, "0")}
            </option>
          ))}
        </select>
        <select value={toPeriod} onChange={(e) => setToPeriod(e.target.value)}>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      </div>

      <div className="buttons">
      <button onClick={backOne} className="back-button">
          Back
        </button>
        <button onClick={handleNextStep} className="next-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1;
