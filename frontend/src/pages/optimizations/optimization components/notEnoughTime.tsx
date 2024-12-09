import { useState } from "react";
import WorkingHours from "./WorkingHoursModal";

export const LessTimeComponent: React.FC = () => {
    // Tracks if optimization screen is visible
    const [isVisible, setIsVisible] = useState(true);
    // Tracks if extend hours screen is open
    const [extendHours, setExtendHours] = useState(false);
    // Tracks if extend hours confirmation is shown
    const [extendHoursNotif, setExtendHoursNotif] = useState(false);

    // Handler for clicking 'No'
    const handleNoClick = () => {
        setIsVisible(false); // Hide the entire component
    };

    // Handler for clicking extend working hours
    const handleExtendHours = () => {
        setExtendHours(true);
    };

    // Handler for closing extend hours modal
    const closeExtendHours = () => {
        setExtendHours(false);
    };

        // Handler for closing extend hours notification modal
        const closeExtendHoursNotif = () => {
            setExtendHoursNotif(false);
        };

    // Handler for finishing extending hours
    const doneExtendHours = () => {
        setExtendHours(false);
        setIsVisible(false);
        setExtendHoursNotif(true);
    };

    return isVisible ? (
        <div className="optimization-divider">
            <label className="title-label">
                You don't have very long to work on <b>Wednesday</b>. would you like to extend your working hours?
            </label>
            <div className="aligned">
                <button className="positive" onClick={handleExtendHours}>
                    Yes
                </button>
                <button className="negative" onClick={handleNoClick}>
                    No
                </button>
            </div>

            {extendHours && (
                <WorkingHours
                    closeExtendHours={closeExtendHours}
                    doneExtendHours={doneExtendHours}
                />
            )}

                        {extendHoursNotif && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <label>Extending working hours!</label>
                        <button className="done-button" onClick={closeExtendHoursNotif}>Done!</button>
                    </div>
                    </div>
            )}
        </div>
    ) : null;
};

export default LessTimeComponent;
