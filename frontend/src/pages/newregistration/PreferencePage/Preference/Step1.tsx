import React, { useState } from "react";
import { TimePreferences, useTimePreferences } from "../../../calendar/hooks/useTimePreferences";

interface Step1Props {
  handleNextStep: (timePreferences: TimePreferences) => void;
}

const INITIAL_TIME_PREFERENCES: TimePreferences = {
  displayStartHour: 9,
  displayEndHour: 21,
  minimumBlockSizeMinutes: 30,
  transitionTimeMinutes: 10,
  workingHours: {
    0: { start: 10, end: 17 },
    1: { start: 11, end: 20 },
    2: { start: 10, end: 20 },
    3: { start: 10, end: 20 },
    4: { start: 10, end: 20 },
    5: { start: 10, end: 20 },
    6: { start: 10, end: 17 },
  },
};

const Step1: React.FC<Step1Props> = ({ handleNextStep }) => {
  // Local state to hold user input for "from" and "to" times
  const [fromHours, setFromHours] = useState("9");
  const [fromMinutes, setFromMinutes] = useState("00");
  const [fromPeriod, setFromPeriod] = useState("AM");

  const [toHours, setToHours] = useState("5");
  const [toMinutes, setToMinutes] = useState("00");
  const [toPeriod, setToPeriod] = useState("PM");

  // Function to convert 12-hour time to 24-hour format
  const convertTo24Hour = (hours: string, minutes: string, period: string) => {
    let hoursIn24 = parseInt(hours);
    if (period === "PM" && hoursIn24 !== 12) {
      hoursIn24 += 12; // Add 12 for PM times, but keep 12 PM as 12
    } else if (period === "AM" && hoursIn24 === 12) {
      hoursIn24 = 0; // Convert 12 AM to 0 hours
    }
    return hoursIn24; // Return the 24-hour formatted hour
  };
  const [, setTimePrefs] = useTimePreferences()
  const handleSubmit = () => {
    // Convert the "From" and "To" times to 24-hour format using the simplified conversion
    const start = convertTo24Hour(fromHours, fromMinutes, fromPeriod);
    const end = convertTo24Hour(toHours, toMinutes, toPeriod);
    
    // Create the updated time preferences
    const updatedTimePreferences = {
      ...INITIAL_TIME_PREFERENCES,
      workingHours: {
        0: { start, end },
        1: { start, end },
        2: { start, end },
        3: { start, end },
        4: { start, end },
        5: { start, end },
        6: { start, end },
      },
    };

    // Log the updated time preferences before passing to next step
    console.log("Updated Time Preferences: ", updatedTimePreferences);
    setTimePrefs(updatedTimePreferences);
    // Call handleNextStep with the updated time preferences
    handleNextStep(updatedTimePreferences);
    
  };

  return (
    <div className="step-container">
      <label>What are your working hours?</label>

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

      <div className="buttons">
        <button onClick={handleSubmit} className="next-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1;