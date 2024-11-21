import { EditModalFrame } from "./EditModalFrame"
import { Assignment } from "../dragAndDrop/DraggableAssignment"
import { toISODate } from "../dates/dateUtils"

export const EditAssignmentModal: React.FC<{
  isShown: boolean
  hide: () => void
  assignment: Assignment
  updateAssignment: (assignment: Assignment) => void
}> = ({ isShown, hide, assignment, updateAssignment }) => {
  const { title, minuteLength, priority, dueDate } = assignment

  return (
    <EditModalFrame title="Edit Assignment" isShown={isShown} hide={hide}>
      <label>
        Name
        <input
          type="text"
          value={title}
          onChange={({ target: { value } }) => {
            updateAssignment({ ...assignment, title: value })
          }}
        />
      </label>
      <label>
        Length
        <select
          value={minuteLength}
          onChange={({ target: { value } }) => {
            updateAssignment({ ...assignment, minuteLength: Number(value) })
          }}
        >
          <option value="30">30 mins</option>
          <option value="60">1 hour</option>
          <option value="120">2 hours</option>
          <option value="240">4 hours</option>
          <option value="480">8 hours</option>
        </select>
      </label>
      <label>
        Due Date
        <input
          type="date"
          value={toISODate(dueDate)}
          onChange={({ target: { value } }) => {
            updateAssignment({
              ...assignment,
              dueDate: new Date(value),
            })
          }}
        />
      </label>
      <label>
        Priority
        <input
          type="range"
          value={priority}
          min={-1}
          max={1}
          className="slider"
          onChange={({ target: { value } }) => {
            updateAssignment({
              ...assignment,
              priority: Number(value) as Assignment["priority"],
            })
          }}
        />
        <div className="slider-labels">
          <p>Low</p>
          <p>Normal</p>
          <p>High</p>
        </div>
      </label>
      <label>
        Class
        <input type="text" value={title} />
      </label>
    </EditModalFrame>
  )
}
