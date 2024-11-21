import { useDroppable } from "@dnd-kit/core"
import { AssignmentLocation } from "../calendar"
import { Assignment, DraggableAssignment } from "./DraggableAssignment"

export const AssignmentList: React.FC<{
  assignments: AssignmentLocation[]
  setEditing: (id: number, editing: boolean) => void
  updateAssignment: (id: number, assignment: Partial<Assignment>) => void
  createAssignment: () => void
  deleteAssignment: (id: number) => void
}> = ({
  assignments,
  updateAssignment,
  setEditing,
  createAssignment,
  deleteAssignment,
}) => {
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
          .map(({ assignment, editing }) => (
            <DraggableAssignment
              key={assignment.id}
              assignment={assignment}
              editing={editing}
              setEditing={(editing) => setEditing(assignment.id, editing)}
              updateAssignment={(updatedAssignment: Partial<Assignment>) => {
                updateAssignment(assignment.id, updatedAssignment)
              }}
              deleteAssignment={() => deleteAssignment(assignment.id)}
            />
          ))}
        <button
          className="assignment-list-button"
          onClick={() => createAssignment()}
        >
          Create Assignment
        </button>
        <button className="assignment-list-button">Refresh</button>
      </div>
    </div>
  )
}
