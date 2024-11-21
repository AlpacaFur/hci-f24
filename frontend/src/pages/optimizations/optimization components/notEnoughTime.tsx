export const LessTimeComponent: React.FC = () => {
    return(
    <div className="optimization-divider">
        <h3>You don't have very long to work on <b>Wednesday</b>.
        What would you like to do about that?</h3>
        <div className="aligned">
        <button className="positive">Skip an Event</button>
        <button className="positive">Extend Working Hours</button>
        <button className="negative">Nothing</button>
        </div>
    </div>
    )
}