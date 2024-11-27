import { useDroppable } from "@dnd-kit/core"
import {
  Assignment,
  DraggableAssignment,
} from "./DraggableAssignment/DraggableAssignment"
import { AssignmentLocation } from "../hooks/useAssignments"

export const ASSIGNMENT_LIST_SLOT_ID = "assignments"

export const AssignmentList: React.FC<{
  assignments: AssignmentLocation[]
  setEditing: (id: number, editing: boolean) => void
  updateAssignment: (id: number, assignment: Partial<Assignment>) => void
  createAssignment: () => void
  deleteAssignment: (id: number) => void
  autoScheduleAssignments: () => void
  unscheduleAll: () => void
}> = ({
  assignments,
  updateAssignment,
  setEditing,
  createAssignment,
  deleteAssignment,
  autoScheduleAssignments,
  unscheduleAll,
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
        <div className="assignment-list">
          {assignments
            .filter((location) => location.slotId === ASSIGNMENT_LIST_SLOT_ID)
            .map(({ assignment, editing }, index) => (
              <DraggableAssignment
                key={assignment.id}
                assignment={assignment}
                editing={editing}
                setEditing={(editing) => setEditing(assignment.id, editing)}
                updateAssignment={(updatedAssignment: Partial<Assignment>) => {
                  updateAssignment(assignment.id, updatedAssignment)
                }}
                deleteAssignment={() => deleteAssignment(assignment.id)}
                locationKey={index}
              />
            ))}
          <button
            className="assignment-list-button"
            onClick={() => createAssignment()}
          >
            Create Assignment
          </button>
        </div>
        <div className="assignment-list-buttons">
          <button
            className="assignment-list-button"
            onClick={autoScheduleAssignments}
          >
            Auto Schedule
          </button>
          <button className="assignment-list-button" onClick={unscheduleAll}>
            Unschedule All
          </button>
          <button className="assignment-list-button">Refresh</button>
        </div>
      </div>
    </div>
  )
}
