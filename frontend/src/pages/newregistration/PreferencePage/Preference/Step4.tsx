import React, { useState, useEffect } from "react";
import { range } from "../../../calendar/range"; // Adjust path as needed
import { Assignment } from "../../../calendar/hooks/useAssignments"; // Adjust path as needed

const canvasLogo = "/photos/logos/canvaslogo.jpeg";

interface Step4Props {
  handleSkip: () => void;
  handlePreviousStep: () => void;
}

const Step4: React.FC<Step4Props> = ({ handleSkip, handlePreviousStep }) => {
  const initialAssignments: Assignment[] = range(1, 6).map((id) => ({
    id,
    title: `Project Proposal ${id}`,
    className: "HCI",
    priority: 0,
    dueDate: new Date("2024-11-22T00:00:00Z"),
    minuteLength: 60,
  }));

  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [checkedAssignments, setCheckedAssignments] = useState<boolean[]>(
    new Array(initialAssignments.length).fill(true)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClassSelectionOpen, setIsClassSelectionOpen] = useState(false);

  // Log updated assignments after setAssignments
  useEffect(() => {
    console.log("Updated Assignments:", assignments);
  }, [assignments]); // This will run whenever 'assignments' state changes

  const openLoginModal = () => {
    setIsModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsModalOpen(false);
  };

  const handleSignIn = () => {
    setIsModalOpen(false);
    setIsClassSelectionOpen(true);
  };

  const handleDone = () => {
    deleteAssignment(1);
    deleteAssignment(2);
    deleteAssignment(3);
    deleteAssignment(4);
    deleteAssignment(5);
    deleteAssignment(6);
    // Identify unchecked assignments
    const uncheckedAssignmentIds = assignments
      .filter((_, index) => !checkedAssignments[index]) // Filter unchecked assignments
      .map((assignment) => assignment.id); // Get their IDs
  
    console.log("Unchecked assignment IDs:", uncheckedAssignmentIds); // Log internally
  
    // Update the assignments by removing unchecked ones
    setAssignments((prevAssignments) => {
      const updatedAssignments = prevAssignments.filter(
        (assignment) => !uncheckedAssignmentIds.includes(assignment.id)
      );
      
      // Log the updated assignments directly after filtering
      console.log("Remaining Assignments", updatedAssignments);
      setAssignments(updatedAssignments);



      console.log("Set Assignments", assignments);
      return updatedAssignments;
    });
  
    setIsClassSelectionOpen(false);
  };

  const deleteAssignment = (id: number) => {
    setAssignments((assignments) =>
      assignments.filter((assignment) => assignment.id !== id)
    )
  }
  
  // To remove assignment with ID 1:

  
  // // Log updated assignments whenever 'assignments' state changes
  // useEffect(() => {
  //   console.log("Updated Assignments:", assignments);
  // }, [assignments]);
  

  const handleCheckboxChange = (index: number) => {
    setCheckedAssignments((prevChecked) =>
      prevChecked.map((checked, i) => (i === index ? !checked : checked))
    );
  };

  return (
    <div className="step-container">
      <div className="centered-content">
        <button className="login-button" onClick={openLoginModal}>
          <img src={canvasLogo} alt="Canvas Logo" className="canvas-logo" />
          Log in with Canvas
        </button>
      </div>
      <button onClick={handlePreviousStep} className="previous-button">
        Back
      </button>
      <button onClick={handleSkip} className="skip-button">
        Skip
      </button>

      {/* Login Modal */}
      {isModalOpen && (
        <div className="modal-overlay" aria-labelledby="login-modal" role="dialog">
          <div className="modal-content">
            <img src={canvasLogo} alt="Canvas Logo" className="canvas-logo" />
            <h2 id="login-modal">Log in to Canvas</h2>
            <input type="text" placeholder="Username" className="input-field" />
            <input type="password" placeholder="Password" className="input-field" />
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
      {isClassSelectionOpen && (
        <div className="modal-overlay" aria-labelledby="class-selection-modal" role="dialog">
          <div className="modal-content">
            <h2 id="class-selection-modal">Select Assignments to Import</h2>
            {assignments.map((assignment, index) => (
              <div key={assignment.id} className="assignment-checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={checkedAssignments[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <span>
                    {assignment.title} - {assignment.className}
                  </span>
                </label>
              </div>
            ))}
            <button className="done-button" onClick={handleDone}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step4;
