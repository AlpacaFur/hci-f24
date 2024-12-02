import React, { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(false); // State to handle loading
 // const [selectedEvents, setSelectedEvents] = useState<string[]>([]); // Track selected events

  const openLoginModal = () => {
    setIsModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsModalOpen(false);
  };

  const handleSignIn = () => {
    setIsModalOpen(false);
    setIsLoading(true); // Start loading state
    setTimeout(() => {
      // Simulate loading for 3 seconds
      setIsLoading(false);
      setIsEventSelectionOpen(true); // After loading, show the event selection modal
    }, 3000); // 3 seconds delay
  };

  const handleDone = () => {
    // Simulate the events being loaded and save to localStorage
    const eventsToStore = ["Cool Event", "Event 2", "Event 3"]; // Dummy events for this example
    localStorage.setItem("selectedEvents", JSON.stringify(eventsToStore));
    console.log("Selected events:", eventsToStore);

    setIsEventSelectionOpen(false);
    navigate("/calendar"); // Navigate to /calendar route
  };

  const handleSkipAndNavigate = () => {
    localStorage.setItem("selectedEvents", JSON.stringify([])); // If skipped, store 0 events
    navigate("/calendar");
  };

  return (
    <div className="step-container">
      <div className="centered-content">
        <button className="login-button" onClick={openLoginModal}>
          <img src={gcalLogo} alt="Google Calendar Logo" className="gcal-logo" />
          Integrate your calendar! Import all of your existing events from your calendar!
        </button>
      </div>
      <button onClick={handlePreviousStep} className="previous-button">
        Back
      </button>
      <button onClick={handleSkipAndNavigate} className="skip-button">
        Skip
      </button>

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
      {isEventSelectionOpen && !isLoading && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Select Events to Import</h2>
            <p>All your events have been loaded.</p>
            <button className="done-button" onClick={handleDone}>
              Done
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Loading all events...</h2>
            <p>Please wait while we import your events.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step5;
