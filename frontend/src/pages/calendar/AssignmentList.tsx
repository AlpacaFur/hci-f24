import { useDroppable } from "@dnd-kit/core"
import { AssignmentLocation } from "./calendar"
import { DraggableAssignment } from "./DraggableAssignment"

export const AssignmentList: React.FC<{
  assignmentMap: AssignmentLocation[]
}> = ({ assignmentMap }) => {
  const { setNodeRef, isOver } = useDroppable({ id: "assignments" })

  return (
    <div className="assignments-container">
      <h2>
        Recent
        <br />
        Assignments
      </h2>
      <div className={"assignments" + (isOver ? " over" : "")} ref={setNodeRef}>
        {assignmentMap
          .filter((location) => location.slotId === "assignments")
          .map(({ assignment }) => (
            <DraggableAssignment key={assignment.id} assignment={assignment} />
          ))}
      </div>
    </div>
  )
}
