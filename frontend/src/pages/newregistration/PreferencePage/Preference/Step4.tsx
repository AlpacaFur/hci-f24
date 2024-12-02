import React, { useState } from "react";

// Path to the Canvas logo stored in the public folder
const canvasLogo = "/photos/logos/canvaslogo.jpeg";

interface Step4Props {
  handleLoginWithCanvas: () => void;
  handleSkip: () => void;
  handlePreviousStep: () => void;
  handleNextStep: () => void; // Step 5 navigation
}

const Step4: React.FC<Step4Props> = ({
  //handleLoginWithCanvas,
  handleNextStep,
  handleSkip,
  handlePreviousStep,
  
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClassSelectionOpen, setIsClassSelectionOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to handle loading
  const openLoginModal = () => {
    console.log("Opening login modal"); // Debug
    setIsModalOpen(true);
  };

  const closeLoginModal = () => {
    console.log("Closing login modal"); // Debug
    setIsModalOpen(false);
  };

  const handleSignIn = () => {
    console.log("Sign in clicked, closing login modal and opening class selection"); // Debug
    setIsModalOpen(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsClassSelectionOpen(true);
    }, 2500)
    
  };

  const handleDone = () => {
    console.log("Done clicked, closing class selection and moving to Step 5"); // Debug
    setIsClassSelectionOpen(false);
    handleSkip(); // Navigates to Step 5
  };

  return (
    <div className="step-container">
      <div className="inner-goop-canvas">
        <button className="login-button" onClick={openLoginModal}>
          <img src={canvasLogo} alt="Canvas Logo" className="canvas-logo" />
          Integrate your Canvas Assignments
        </button>
      </div>
      <div className="buttons">
        <button onClick={handlePreviousStep} className="back-button">
          Back
        </button>
        <button onClick={handleNextStep} className="next-button">
          Skip
        </button>
      </div>


      {/* Login Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <img src={canvasLogo} alt="Canvas Logo" className="icon-logo" />
            <h2>Log in to Canvas</h2>
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
              Sign In
            </button>
            <button className="close-button" onClick={closeLoginModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Class Selection Modal */}

    {isClassSelectionOpen && !isLoading && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Import Sucessful</h2>
            <p>All your class assignments have been loaded.</p>
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
            <h2>Loading all Classes...</h2>
            <p>Please wait while we import your assignments.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step4;
