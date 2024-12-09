import React, { useState } from "react";
import "./optimizationmodals.css";
import BreakModal from "./addBreakModal";

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
        setIsVisible(false);
    }

    //Handle closing notification
    const closeNotification = () => {
        setNotificationOpen(false);
    }

      return isVisible ? (
        <div className="optimization-divider">
            <label className="title-label">
                You worked too hard on  <b>Monday</b>.
                Would you like to add a longer break on Tuesday?
                
            </label>
            <div className="aligned">
                <button className="positive" onClick={handleYesClick}>Yes</button>
                <button className="negative" onClick={handleNoClick}>No</button>
            </div>
            {modalOpen && 
             <BreakModal
             breakMinutes={breakMinutes}
             studyHours={studyHours}
             studyMinutes={studyMinutes}
             setBreakMinutes={setBreakMinutes}
             setStudyHours={setStudyHours}
             setStudyMinutes={setStudyMinutes}
             closeModal={closeModal}
             doneSettingTime={doneSettingTime}
           />}
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
    ) : null;
};