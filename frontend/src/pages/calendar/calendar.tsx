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
import { useState } from "react"
import { range } from "./range"
import { NavigationTabs } from "../../components/NavigationTabs"
import { Assignment } from "./dragAndDrop/DraggableAssignment/DraggableAssignment"
import { snapCenterToCursor } from "@dnd-kit/modifiers"
import { PlainAssignment } from "./dragAndDrop/PlainAssignment"
import { AssignmentList } from "./dragAndDrop/AssignmentList"
import { customDropAnimation } from "./dragAndDrop/customModifiers"
import { generateSlots } from "./slotAlgorithm/generateSlots"
import { CalendarContent } from "./calendarComponents/CalendarContent"
import { useAssignmentStorage } from "./hooks/useAssignments"
import { useEvents } from "./hooks/useEvents"
import { useTimePreferences } from "./hooks/useTimePreferences"
import { Event } from "./calendarTypes"
import { reschedule } from "./slotAlgorithm/reschedule"

const DATES = Array(7)
  .fill(0)
  .map(
    (_, index) =>
      new Date(
        new Date("2024-11-11 00:00").getTime() + index * 1000 * 60 * 60 * 24
      )
  )

const HomePage: React.FC = () => {
  const [events, setEvents] = useEvents()

  const [activeAssignment, setActiveAssignment] = useState<Assignment | false>(
    false
  )

  const {
    assignments,
    updateAssignment,
    deleteAssignment,
    createAssignment,
    setEditing,
    moveAssignment,
    setAssignments,
    autoScheduleAssignments,
    unscheduleAll,
  } = useAssignmentStorage()

  const [timePreferences] = useTimePreferences()

  const workBlocks = generateSlots(DATES, events, timePreferences)

  const updateEvents = (events: Event[]) => {
    const newWorkBlocks = generateSlots(DATES, events, timePreferences)
    setAssignments((currentAssignments) => {
      return reschedule(currentAssignments, workBlocks, newWorkBlocks)
    })
    setEvents(events)
  }

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
                assignments.find(
                  (location) => location.assignment.id === event.active.id
                )!.assignment
              )
            }
            onDragEnd={(event) => {
              if (event.over !== null) {
                moveAssignment(Number(event.active.id), String(event.over.id))
              }
              setActiveAssignment(false)
            }}
          >
            <div className="time-labels">
              {range(
                timePreferences.displayStartHour,
                timePreferences.displayEndHour + 1
              ).map((hour) => {
                const dayPeriod = hour < 12 ? "am" : "pm"
                const convertedHour = hour === 12 ? 12 : hour % 12

                return (
                  <p key={convertedHour + dayPeriod}>
                    {convertedHour}
                    {dayPeriod}
                  </p>
                )
              })}
            </div>
            <div className="content-frame">
              <div className="calendar-dates">
                {DATES.map((sourceDate) => {
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
              <CalendarContent
                dates={DATES}
                events={events}
                setEvents={updateEvents}
                timePreferences={timePreferences}
                assignments={assignments}
                setEditing={setEditing}
                updateAssignment={updateAssignment}
                deleteAssignment={deleteAssignment}
                freeSlots={workBlocks}
              />
            </div>
            <AssignmentList
              assignments={assignments}
              updateAssignment={updateAssignment}
              setEditing={setEditing}
              deleteAssignment={deleteAssignment}
              createAssignment={createAssignment}
              autoScheduleAssignments={() =>
                autoScheduleAssignments(workBlocks)
              }
              unscheduleAll={unscheduleAll}
            />

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
