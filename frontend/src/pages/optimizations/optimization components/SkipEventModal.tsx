import React from "react";
import "./optimizationmodals.css";

interface SkipEventProps {
    closeSkipEvent: () => void;
    doneSkipEvent: () => void;
}
const SkipEvent: React.FC<SkipEventProps> = ({
    closeSkipEvent,
    doneSkipEvent
}) => {
    return (
        <div className="modal-overlay">
          <div className="modal-content">
          <button className="exit-button" onClick={closeSkipEvent}>X</button>
            <label> Skip Event </label>
            <button className="done-button" onClick={doneSkipEvent}>
                Done!
            </button>
            </div>
            </div>
    );
}

export default SkipEvent;