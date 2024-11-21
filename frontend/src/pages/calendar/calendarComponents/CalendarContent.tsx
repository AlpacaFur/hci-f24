import { DndContext } from "@dnd-kit/core"
import { updateTimeFromCoordDelta } from "../dates/dateUtils"
import {
  createSnapModifier,
  restrictToParentElement,
} from "../dragAndDrop/customModifiers"
import { CalendarEvents } from "./CalendarEvents"
import { Dispatch, SetStateAction, useRef } from "react"
import { Event, WorkBlock } from "../calendarTypes"
import { TimePreferences } from "../slotAlgorithm/generateSlots"
import { CalendarWorkSlots } from "./CalendarWorkSlots"
import { AssignmentLocation } from "../calendar"
import { Assignment } from "../dragAndDrop/DraggableAssignment"

export const CalendarContent: React.FC<{
  setEvents: Dispatch<SetStateAction<Event[]>>
  events: Event[]
  dates: Date[]
  timePreferences: TimePreferences
  assignments: AssignmentLocation[]
  updateAssignment: (id: number, assignment: Partial<Assignment>) => void
  deleteAssignment: (id: number) => void
  setEditing: (id: number, editing: boolean) => void

  freeSlots: WorkBlock[]
}> = ({
  setEvents,
  events,
  dates,
  timePreferences,
  assignments,
  freeSlots,
  updateAssignment,
  setEditing,
  deleteAssignment,
}) => {
  const contentFrameRef = useRef<HTMLDivElement>(null)

  return (
    <div className="calendar-overlay-container">
      <DndContext
        modifiers={[
          restrictToParentElement(contentFrameRef),
          createSnapModifier(150, 15),
        ]}
        autoScroll={false}
        onDragEnd={(draggedEvent) => {
          setEvents(
            events.map((event) => {
              if (event.id === draggedEvent.active.id) {
                return updateTimeFromCoordDelta(
                  draggedEvent.delta.x,
                  draggedEvent.delta.y,
                  event
                )
              }
              return event
            })
          )
        }}
      >
        <CalendarEvents
          events={events}
          dates={dates}
          timePreferences={timePreferences}
          ref={contentFrameRef}
        />
      </DndContext>
      <CalendarWorkSlots
        assignments={assignments}
        updateAssignment={updateAssignment}
        dates={dates}
        freeSlots={freeSlots}
        timePreferences={timePreferences}
        setEditing={setEditing}
        deleteAssignment={deleteAssignment}
      />
    </div>
  )
}
