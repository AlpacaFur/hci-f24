import "./calendar.css"
import NavBar from "../../components/navBar/navBar"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { useRef, useState } from "react"
import { updateTimeFromCoordDelta } from "./dates/dateUtils"
import { DraggableEvent } from "./dragAndDrop/DraggableEvent"
import { range } from "./range"
import { Event } from "./calendarTypes"
import { NavigationTabs } from "../../components/NavigationTabs"
import {
  Assignment,
  DraggableAssignment,
} from "./dragAndDrop/DraggableAssignment"
import { DroppableTimeSlot } from "./dragAndDrop/DroppableTimeSlot"
import { snapCenterToCursor } from "@dnd-kit/modifiers"
import { PlainAssignment } from "./dragAndDrop/PlainAssignment"
import { AssignmentList } from "./dragAndDrop/AssignmentList"
import {
  createSnapModifier,
  customDropAnimation,
  restrictToParentElement,
} from "./dragAndDrop/customModifiers"
import { generateSlots, TimePreferences } from "./slotAlgorithm/generateSlots"

const initialEvents: Event[] = [
  {
    name: "Cool Event",
    start: new Date("2024-11-12 15:30"),
    end: new Date("2024-11-12 18:30"),
    id: 1,
  },
  {
    name: "Cool Event 2",
    start: new Date("2024-11-13 09:30"),
    end: new Date("2024-11-13 10:30"),
    id: 2,
  },
  {
    name: "Cool Event 3",
    start: new Date("2024-11-15 13:30"),
    end: new Date("2024-11-15 14:30"),
    id: 3,
  },
]

const TIME_PREFS: TimePreferences = {
  displayStartHour: 9,
  displayEndHour: 21,
  workingStartHour: 10,
  workingEndHour: 20,
  minimumBlockSizeMinutes: 30,
  transitionTimeMinutes: 10,
}

export interface AssignmentLocation {
  assignment: Assignment
  slotId: string
}

const HomePage: React.FC = () => {
  const dates = Array(7)
    .fill(0)
    .map(
      (_, index) =>
        new Date(
          new Date("2024-11-11 00:00").getTime() + index * 1000 * 60 * 60 * 24
        )
    )

  const [events, setEvents] = useState(initialEvents)

  const [activeAssignment, setActiveAssignment] = useState<Assignment | false>(
    false
  )

  const [assignmentMap, setAssignmentMap] = useState<AssignmentLocation[]>(
    range(1, 6).map(
      (id): AssignmentLocation => ({
        slotId: "assignments",
        assignment: {
          className: "HCI",
          title: "Project Proposal " + id,
          id,
          minuteLength: 60,
        },
      })
    )
  )

  const freeSlots = generateSlots(dates, events, TIME_PREFS)

  const contentFrameRef = useRef<HTMLDivElement>(null)

  const assignmentSensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  return (
    <div>
      <NavBar />
      <div className="center-container">
        <NavigationTabs />
        <div className="calendar-side">
          <DndContext
            collisionDetection={pointerWithin}
            sensors={assignmentSensors}
            modifiers={[snapCenterToCursor]}
            cancelDrop={(args) => args.over === null}
            onDragStart={(event) =>
              setActiveAssignment(
                assignmentMap.find(
                  (location) => location.assignment.id === event.active.id
                )!.assignment
              )
            }
            onDragEnd={(event) => {
              const selectedAssignment = assignmentMap.find(
                (location) => location.assignment.id === event.active.id
              )

              console.log(assignmentMap)

              if (event.over !== null) {
                setAssignmentMap((map) => [
                  ...map.filter(
                    (assignmentLocation) =>
                      assignmentLocation.assignment.id !==
                      Number(event.active.id)
                  ),
                  {
                    assignment: selectedAssignment!.assignment,
                    slotId: String(event.over!.id),
                  },
                ])
              }
            }}
          >
            <div className="time-labels">
              {range(
                TIME_PREFS.displayStartHour,
                TIME_PREFS.displayEndHour + 1
              ).map((hour) => {
                const dayPeriod = hour < 12 ? "am" : "pm"
                const convertedHour = hour === 12 ? 12 : hour % 12

                return (
                  <p>
                    {convertedHour}
                    {dayPeriod}
                  </p>
                )
              })}
            </div>
            <div className="content-frame">
              <div className="calendar-dates">
                {dates.map((sourceDate) => {
                  const month = sourceDate.toLocaleDateString("en-us", {
                    month: "short",
                  })
                  const dayOfTheWeek = sourceDate.toLocaleDateString("en-us", {
                    weekday: "long",
                  })
                  const date = sourceDate.getDate()
                  return (
                    <div key={sourceDate.getTime()}>
                      <p>{month}</p>
                      <p>{date}</p>
                      <p>{dayOfTheWeek}</p>
                    </div>
                  )
                })}
              </div>
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
                  <div className="calendar-body" ref={contentFrameRef}>
                    {dates.map((date) => {
                      // TODO: make these checks more robust
                      const eventsForDay = events.filter(
                        ({ start }) => start.getDate() === date.getDate()
                      )

                      return (
                        <div key={date.getTime()} className="day-column">
                          {range(
                            TIME_PREFS.displayStartHour,
                            TIME_PREFS.displayEndHour
                          ).map((num) => (
                            <div
                              key={num}
                              className="calendar-background-cell"
                            ></div>
                          ))}
                          {eventsForDay.map((event) => (
                            <DraggableEvent
                              event={event}
                              key={event.start.getTime()}
                              startOffsetHours={TIME_PREFS.displayStartHour}
                            />
                          ))}
                        </div>
                      )
                    })}
                  </div>
                </DndContext>
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
                            startOffsetHours={TIME_PREFS.displayStartHour}
                          >
                            {assignmentMap
                              .filter(
                                (location) =>
                                  location.slotId === String(event.id)
                              )
                              .map((location) => (
                                <DraggableAssignment
                                  key={location.assignment.id}
                                  assignment={location.assignment}
                                />
                              ))}
                          </DroppableTimeSlot>
                        ))}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <AssignmentList assignmentMap={assignmentMap} />

            <DragOverlay dropAnimation={customDropAnimation}>
              {activeAssignment && (
                <PlainAssignment assignment={activeAssignment} />
              )}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  )
}

export default HomePage
