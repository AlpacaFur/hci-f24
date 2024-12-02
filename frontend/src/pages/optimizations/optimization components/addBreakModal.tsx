import React from "react";
import "./optimizationmodals.css";

interface BreakModalProps {
  breakMinutes: number;
  studyHours: number;
  studyMinutes: number;
  setBreakMinutes: React.Dispatch<React.SetStateAction<number>>;
  setStudyHours: React.Dispatch<React.SetStateAction<number>>;
  setStudyMinutes: React.Dispatch<React.SetStateAction<number>>;
  closeModal: () => void;
  doneSettingTime: () => void;
}

const BreakModal: React.FC<BreakModalProps> = ({
    breakMinutes,
    studyHours,
    studyMinutes,
    setBreakMinutes,
    setStudyHours,
    setStudyMinutes,
    closeModal,
    doneSettingTime,
  }) => {
    return (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="exit-button" onClick={closeModal}>X</button>
            <label>Add Break</label>
            <div className="time-inputs">
                <label>Take a break of</label>
          <select
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(Number(e.target.value))}
          >
            <option value={0}>00</option>
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={45}>45</option>
            <option value={60}>60</option>
          </select>
          <label>minutes</label>
        </div>
        <label>after</label>
      <div className="time-inputs">
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
          <label>hours</label>
          <label>and</label>
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
          <label>minutes of studying</label>
      </div>
      <button className="done-button" onClick={doneSettingTime}>
        Done
        </button>
          </div>
          </div>
    );
  };

  export default BreakModal;