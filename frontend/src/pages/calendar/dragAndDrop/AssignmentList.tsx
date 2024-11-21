import { useDroppable } from "@dnd-kit/core"
import { AssignmentLocation } from "../calendar"
import { DraggableAssignment } from "./DraggableAssignment"
import { Dispatch, SetStateAction } from "react"

export const AssignmentList: React.FC<{
  assignments: AssignmentLocation[]
  setAssignments: Dispatch<SetStateAction<AssignmentLocation[]>>
}> = ({ assignments, setAssignments }) => {
  const { setNodeRef, isOver } = useDroppable({ id: "assignments" })

  return (
    <div className="assignments-container">
      <h2>
        Recent
        <br />
        Assignments
      </h2>
      <div className={"assignments" + (isOver ? " over" : "")} ref={setNodeRef}>
        {assignments
          .filter((location) => location.slotId === "assignments")
          .map(({ assignment }) => (
            <DraggableAssignment
              key={assignment.id}
              assignment={assignment}
              updateAssignment={(updatedAssignment) => {
                setAssignments((assignments) =>
                  assignments.map((currentAssignment) => {
                    if (currentAssignment.assignment.id === assignment.id) {
                      return {
                        slotId: currentAssignment.slotId,
                        assignment: updatedAssignment,
                      }
                    } else {
                      return currentAssignment
                    }
                  })
                )
              }}
            />
          ))}
      </div>
    </div>
  )
}
