import { WorkBlock } from "../calendarTypes"
import {
  Assignment,
  DraggableAssignment,
} from "../dragAndDrop/DraggableAssignment/DraggableAssignment"
import { DroppableTimeSlot } from "../dragAndDrop/DroppableTimeSlot"
import { AssignmentLocation } from "../hooks/useAssignments"
import { TimePreferences } from "../hooks/useTimePreferences"

export const CalendarWorkSlots: React.FC<{
  freeSlots: WorkBlock[]
  dates: Date[]
  timePreferences: TimePreferences
  assignments: AssignmentLocation[]
  updateAssignment: (id: number, assignment: Partial<Assignment>) => void
  setEditing: (id: number, editing: boolean) => void
  deleteAssignment: (id: number) => void
}> = ({
  freeSlots,
  dates,
  timePreferences,
  assignments,
  updateAssignment,
  setEditing,
  deleteAssignment,
}) => {
  return (
    <div className="calendar-body calendar-slot-overlay">
      {dates.map((date) => {
        // TODO: make these checks more robust
        const workBlocksForDay = freeSlots.filter(
          ({ start }) => start.getDate() === date.getDate()
        )

        const editing = assignments.some(
          (assignment: AssignmentLocation) =>
            assignment.editing &&
            workBlocksForDay.some(
              (workBlock) => Number(assignment.slotId) === workBlock.id
            )
        )

        return (
          <div
            key={date.getTime()}
            className={"day-column" + (editing ? " editing" : "")}
          >
            {workBlocksForDay.map((workBlock) => (
              <DroppableTimeSlot
                key={workBlock.id}
                workBlock={{
                  start: workBlock.start,
                  end: workBlock.end,
                  id: workBlock.id,
                }}
                startOffsetHours={timePreferences.displayStartHour}
              >
                {assignments
                  .filter(
                    (location) => location.slotId === String(workBlock.id)
                  )
                  .map((location, index) => (
                    <DraggableAssignment
                      key={location.assignment.id}
                      assignment={location.assignment}
                      updateAssignment={(assignment) =>
                        updateAssignment(location.assignment.id, assignment)
                      }
                      editing={location.editing}
                      setEditing={(editing) =>
                        setEditing(location.assignment.id, editing)
                      }
                      deleteAssignment={() =>
                        deleteAssignment(location.assignment.id)
                      }
                      locationKey={workBlock.start.getTime() * 1000 + index}
                    />
                  ))}
              </DroppableTimeSlot>
            ))}
          </div>
        )
      })}
    </div>
  )
}
