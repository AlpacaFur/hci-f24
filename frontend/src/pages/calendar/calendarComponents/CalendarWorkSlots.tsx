import { AssignmentLocation } from "../calendar"
import { WorkBlock } from "../calendarTypes"
import {
  Assignment,
  DraggableAssignment,
} from "../dragAndDrop/DraggableAssignment"
import { DroppableTimeSlot } from "../dragAndDrop/DroppableTimeSlot"
import { TimePreferences } from "../slotAlgorithm/generateSlots"

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

        return (
          <div key={date.getTime()} className="day-column">
            {workBlocksForDay.map((event) => (
              <DroppableTimeSlot
                key={event.id}
                workBlock={{
                  start: event.start,
                  end: event.end,
                  id: event.id,
                }}
                startOffsetHours={timePreferences.displayStartHour}
              >
                {assignments
                  .filter((location) => location.slotId === String(event.id))
                  .map((location) => (
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
