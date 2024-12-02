import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Path to the Google Calendar logo stored in the public folder
const gcalLogo = "/photos/logos/googlecallogo.jpeg";

interface Step5Props {
  handleLoginWithGC: () => void;
  handleSkip: () => void;
  handlePreviousStep: () => void;
}

const Step5: React.FC<Step5Props> = ({ handlePreviousStep }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEventSelectionOpen, setIsEventSelectionOpen] = useState(false);

  const openLoginModal = () => {
    setIsModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsModalOpen(false);
  };

  const handleSignIn = () => {
    setIsModalOpen(false);
    setIsEventSelectionOpen(true);
  };

  const handleDone = () => {
    setIsEventSelectionOpen(false);
    navigate("/calendar"); // Navigate to /calendar route
  };

  const handleSkipAndNavigate = () => {
    navigate("/calendar");
  };

  return (
    <div className="step-container">
      <div className="inner-goop-gcal">
        <button className="login-button" onClick={openLoginModal}>
          <img src={gcalLogo} alt="Google Calendar Logo" className="icon-logo" />
          Integrate your Google Canvas Events
        </button>
      </div>
      <div className="buttons">
        <button onClick={handlePreviousStep} className="back-button">
          Back
        </button>
        <button onClick={handleSkipAndNavigate} className="next-button">
          Skip
        </button>
      </div>

      {/* Login Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <img src={gcalLogo} alt="Google Calendar Logo" className="gcal-logo" />
            <h2>Log in to Google Calendar</h2>
            <input
              type="text"
              placeholder="Username"
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
            />
            <button className="sign-in-button" onClick={handleSignIn}>
              Login
            </button>
            <button className="close-button" onClick={closeLoginModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Event Selection Modal */}
      {isEventSelectionOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Select Events to Import</h2>
            <label>
              <input type="checkbox" />
              Event 1
            </label>
            <label>
              <input type="checkbox" />
              Event 2
            </label>
            <label>
              <input type="checkbox" />
              Event 3
            </label>
            <button className="done-button" onClick={handleDone}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step5;
