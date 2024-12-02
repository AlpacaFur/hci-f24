import { useState } from "react";
import WorkingHours from "./WorkingHoursModal";
import SkipEvent from "./skipEventModal";

export const LessTimeComponent: React.FC = () => {
    // Tracks if optimization screen is visible
    const [isVisible, setIsVisible] = useState(true);
    // Tracks if extend hours screen is open
    const [extendHours, setExtendHours] = useState(false);
    // Tracks if skip event is visible
    const [skipEvent, setSkipEvent] = useState(false);
    // Tracks if skip event confirmation is shown
    const [skipEventNotif, setSkipEventNotif] = useState(false);
    // Tracks if extend hours confirmation is shown
    const [extendHoursNotif, setExtendHoursNotif] = useState(false);

    // Handler for clicking 'No'
    const handleNoClick = () => {
        setIsVisible(false); // Hide the entire component
    };

    // Handler for clicking skip event
    const handleSkipEvent = () => {
        setSkipEvent(true);
    };

    // Handler for closing skip event modal
    const closeSkipEvent = () => {
        setSkipEvent(false);
    };

    // Handler for closing skip event notificationmodal
    const closeSkipEventNotif = () => {
        setSkipEventNotif(false);
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

    // Handler for finishing skip event
    const doneSkipEvent = () => {
        setSkipEvent(false);
        setIsVisible(false);
        setSkipEventNotif(true);
    };

    return isVisible ? (
        <div className="optimization-divider">
            <h3>
                You don't have very long to work on <b>Wednesday</b>. What would you like to do about that?
            </h3>
            <div className="aligned">
                <button className="positive" onClick={handleSkipEvent}>
                    Skip an Event
                </button>
                <button className="positive" onClick={handleExtendHours}>
                    Extend Working Hours
                </button>
                <button className="negative" onClick={handleNoClick}>
                    Nothing
                </button>
            </div>

            {extendHours && (
                <WorkingHours
                    closeExtendHours={closeExtendHours}
                    doneExtendHours={doneExtendHours}
                />
            )}

            {skipEvent && (
                <SkipEvent
                    closeSkipEvent={closeSkipEvent}
                    doneSkipEvent={doneSkipEvent}
                />
            )}

            {skipEventNotif && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <label>Removing event from your schedule!</label>
                        <button className="done-button" onClick={closeSkipEventNotif}>Done!</button>
                    </div>
                    </div>
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
