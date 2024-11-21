import React, { useState } from "react";

export const ExtraTimeComponent: React.FC = () => {
      // State to track if the component should be visible
      const [isVisible, setIsVisible] = useState(true);
      // State to track if the pop-up should be shown
      const [showPopup, setShowPopup] = useState(false);
  
      // Handler for clicking 'Yes'
      const handleYesClick = () => {
          setShowPopup(true);  // Show the pop-up
      };
  
      // Handler for clicking 'No'
      const handleNoClick = () => {
          setIsVisible(false);  // Hide the entire component
      };

    // Handler for closing the popup
    const closePopup = () => {
        setShowPopup(false);  // Hide the popup
    };

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

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
<h4>Popup: You can schedule a longer break now!</h4>
<button onClick={closePopup} className="close-btn">Close</button>
</div>
                </div>
            )}
        </div>
    ) : null; // If `isVisible` is false, return null to hide the entire component
};