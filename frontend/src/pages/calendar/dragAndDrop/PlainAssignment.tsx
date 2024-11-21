import { minutesToDisplayDate } from "../dates/dateUtils"
import { Assignment } from "./DraggableAssignment"

export const PlainAssignment: React.FC<{ assignment: Assignment }> = ({
  assignment: { title, className, minuteLength },
}) => {
  return (
    <div className="assignment">
      <div
        className="assignment-content dragging"
        style={{ height: minuteLength }}
      >
        <p className="title">{title}</p>
        <div>
          <p className="class">{className}</p>
          <p className="size">{minutesToDisplayDate(minuteLength)}</p>
        </div>
      </div>
    </div>
  )
}
