import { Dispatch, SetStateAction } from "react"
import { AssignmentLocation } from "../calendar"
import { WorkBlock } from "../calendarTypes"
import { DraggableAssignment } from "../dragAndDrop/DraggableAssignment"
import { DroppableTimeSlot } from "../dragAndDrop/DroppableTimeSlot"
import { TimePreferences } from "../slotAlgorithm/generateSlots"

export const CalendarWorkSlots: React.FC<{
  freeSlots: WorkBlock[]
  dates: Date[]
  timePreferences: TimePreferences
  assignments: AssignmentLocation[]
  setAssignments: Dispatch<SetStateAction<AssignmentLocation[]>>
}> = ({ freeSlots, dates, timePreferences, assignments, setAssignments }) => {
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
                      updateAssignment={(updatedAssignment) => {
                        setAssignments((assignments) =>
                          assignments.map((currentAssignment) => {
                            if (
                              currentAssignment.assignment.id ===
                              location.assignment.id
                            ) {
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
              </DroppableTimeSlot>
            ))}
          </div>
        )
      })}
    </div>
  )
}
