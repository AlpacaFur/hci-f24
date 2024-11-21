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

export const CalendarContent: React.FC<{
  setEvents: Dispatch<SetStateAction<Event[]>>
  events: Event[]
  dates: Date[]
  timePreferences: TimePreferences
  assignments: AssignmentLocation[]
  setAssignments: Dispatch<SetStateAction<AssignmentLocation[]>>
  freeSlots: WorkBlock[]
}> = ({
  setEvents,
  events,
  dates,
  timePreferences,
  assignments,
  setAssignments,
  freeSlots,
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
        setAssignments={setAssignments}
        dates={dates}
        freeSlots={freeSlots}
        timePreferences={timePreferences}
      />
    </div>
  )
}
