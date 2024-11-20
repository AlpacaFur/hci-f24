import { Assignment } from "./DraggableAssignment"

export const PlainAssignment: React.FC<{ assignment: Assignment }> = ({
  assignment: { title, className, minuteLength },
}) => {
  return (
    <div className="assignment">
      <div className="assignment-content dragging">
        <p className="title">{title}</p>
        <div>
          <p className="class">{className}</p>
          <p className="size">{minuteLength}</p>
        </div>
      </div>
    </div>
  )
}
