import React, { useState } from "react";
import "./optimizationmodals.css"

interface timeProps {
    studyHours: number;
    studyMinutes: number;
    breakMinutes: number;
    setStudyHours: React.Dispatch<React.SetStateAction<number>>;
    setStudyMinutes: React.Dispatch<React.SetStateAction<number>>;
    setBreakMinutes: React.Dispatch<React.SetStateAction<number>>;
}
export const ExtraTimeComponent: React.FC<timeProps> = ({studyHours,
    studyMinutes,
    breakMinutes,
    setStudyHours,
    setStudyMinutes,
    setBreakMinutes,}) => {
      // State to track if the component should be visible
      const [isVisible, setIsVisible] = useState(true);
      // State to track if the pop-up should be shown
      const [modalOpen, setModalOpen] = useState(false);
      // State to track if notfication should be shown
      const [notificationOpen, setNotificationOpen] = useState(false);
  
      // Handler for clicking 'Yes'
      const handleYesClick = () => {
          setModalOpen(true);  // Show the pop-up
      };
  
      // Handler for clicking 'No'
      const handleNoClick = () => {
          setIsVisible(false);  // Hide the entire component
      };

    // Handler for closing the popup
    const closeModal = () => {
        setModalOpen(false);  // Hide the popup
    };

    //Handler for clicking done button in modal
    const doneSettingTime = () => {
        setModalOpen(false);
        setNotificationOpen(true);
    }

    //Handle closing notification
    const closeNotification = () => {
        setNotificationOpen(false);
    }

      return isVisible ? (
        <div className="optimization-divider">
            <h3>
                Looks like you have a lot of time to do work on <b>Tuesday</b>.
                Would you like to add a longer break?
            </h3>
            <div className="aligned">
                <button className="positive" onClick={handleYesClick}>Yes</button>
                <button className="negative" onClick={handleNoClick}>No</button>
            </div>
            {modalOpen && (
                 <div className="modal-overlay">
          <div className="modal-content">
            <button className="exit-button" onClick={closeModal}>X</button>
            <label>Set a break of </label>
            <div className="time-box">
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
      <div className="time-input">
        <div className="time-box">
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
        </div>
        <div className="time-box">
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
      </div>
      <button className="done-button" onClick={doneSettingTime}>
        Done
        </button>
          </div>
          </div>
            )}
            {notificationOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <label>Successfully added a break!</label>
            <button className="done-button" onClick={closeNotification}>
                Okay
            </button>
          </div>
          </div>
            )}
        </div>
    ) : null; // If `isVisible` is false, return null to hide the entire component
};