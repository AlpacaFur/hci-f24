import React from "react";
import "./optimizationmodals.css";

interface WorkingHoursModalProps {
    closeExtendHours: () => void;
    doneExtendHours: () => void;
}
const WorkingHours: React.FC<WorkingHoursModalProps> = ({
    closeExtendHours,
    doneExtendHours
}) => {
    return (
        <div className="modal-overlay">
          <div className="modal-content">
          <button className="exit-button" onClick={closeExtendHours}>X</button>
            <label> Extend Working Hours</label>
            <button className="done-button" onClick={doneExtendHours}>
                Done!
            </button>
            </div>
            </div>
    );
}

export default WorkingHours;