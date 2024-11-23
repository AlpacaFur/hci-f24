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
import { Event } from "./calendarTypes"
import { NavigationTabs } from "../../components/NavigationTabs"
import { Assignment } from "./dragAndDrop/DraggableAssignment"
import { snapCenterToCursor } from "@dnd-kit/modifiers"
import { PlainAssignment } from "./dragAndDrop/PlainAssignment"
import { AssignmentList } from "./dragAndDrop/AssignmentList"
import { customDropAnimation } from "./dragAndDrop/customModifiers"
import { generateSlots, TimePreferences } from "./slotAlgorithm/generateSlots"
import { CalendarContent } from "./calendarComponents/CalendarContent"

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
  minimumBlockSizeMinutes: 30,
  transitionTimeMinutes: 10,
  workingHours: {
    0: {
      start: 10,
      end: 17,
    },
    1: {
      start: 11,
      end: 20,
    },
    2: {
      start: 10,
      end: 20,
    },
    3: {
      start: 10,
      end: 20,
    },
    4: {
      start: 10,
      end: 20,
    },
    5: {
      start: 10,
      end: 20,
    },
    6: {
      start: 10,
      end: 17,
    },
  },
}

export interface AssignmentLocation {
  assignment: Assignment
  slotId: string
  editing: boolean
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

  const [assignments, setAssignments] = useState<AssignmentLocation[]>(
    range(1, 6).map(
      (id): AssignmentLocation => ({
        slotId: "assignments",
        assignment: {
          className: "HCI",
          title: "Project Proposal " + id,
          priority: 0,
          dueDate: new Date("2024-11-22 00:00"),
          id,
          minuteLength: 60,
        },
        editing: false,
      })
    )
  )

  const updateAssignment = (
    id: number,
    updatedAssignment: Partial<Assignment>
  ) => {
    setAssignments((assignments) =>
      assignments.map((assignment) => {
        if (assignment.assignment.id === id) {
          return {
            ...assignment,
            assignment: { ...assignment.assignment, ...updatedAssignment },
          }
        } else {
          return assignment
        }
      })
    )
  }

  const setEditing = (id: number, editing: boolean) => {
    setAssignments((assignments) =>
      assignments.map((assignment) => {
        if (assignment.assignment.id === id) {
          return { ...assignment, editing }
        } else if (assignment.editing) {
          return { ...assignment, editing: false }
        } else {
          return assignment
        }
      })
    )
  }

  const createAssignment = () => {
    const newId =
      Math.max(...assignments.map((assignment) => assignment.assignment.id)) + 1

    setAssignments((assignments) => [
      ...assignments,
      {
        editing: true,
        slotId: "assignments",
        assignment: {
          className: "HCI",
          dueDate: new Date(),
          id: newId,
          minuteLength: 60,
          priority: 0,
          title: "New Assignment",
        },
      },
    ])
    setEditing(newId, true)
  }

  const deleteAssignment = (id: number) => {
    setAssignments((assignments) =>
      assignments.filter((assignment) => assignment.assignment.id !== id)
    )
  }

  const freeSlots = generateSlots(dates, events, TIME_PREFS)

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
              const selectedAssignment = assignments.find(
                (location) => location.assignment.id === event.active.id
              )

              console.log(assignments)

              if (event.over !== null) {
                setAssignments((map) => [
                  ...map.filter(
                    (assignmentLocation) =>
                      assignmentLocation.assignment.id !==
                      Number(event.active.id)
                  ),
                  {
                    assignment: selectedAssignment!.assignment,
                    slotId: String(event.over!.id),
                    editing: false,
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
              <CalendarContent
                dates={dates}
                events={events}
                setEvents={setEvents}
                timePreferences={TIME_PREFS}
                assignments={assignments}
                setEditing={setEditing}
                updateAssignment={updateAssignment}
                deleteAssignment={deleteAssignment}
                freeSlots={freeSlots}
              />
            </div>
            <AssignmentList
              assignments={assignments}
              updateAssignment={updateAssignment}
              setEditing={setEditing}
              deleteAssignment={deleteAssignment}
              createAssignment={createAssignment}
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
