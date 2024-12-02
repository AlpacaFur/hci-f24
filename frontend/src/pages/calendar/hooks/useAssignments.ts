import { range } from "../range"
import { z } from "zod"
import { useRefreshingLocalStorage } from "./useRefreshingLocalStorage"
import { autoScheduleAssignments } from "../slotAlgorithm/autoSchedule"
import { WorkBlock } from "../calendarTypes"
import { ASSIGNMENT_LIST_SLOT_ID } from "../dragAndDrop/AssignmentList"

const assignmentSchema = z.object({
  title: z.string(),
  id: z.number(),
  className: z.string(),
  dueDate: z.coerce.date(),
  minuteLength: z.number(),
  priority: z.union([z.literal(-1), z.literal(0), z.literal(1)]),
})

const assignmentLocationSchema = z.object({
  assignment: assignmentSchema,
  slotId: z.string(),
  editing: z.boolean(),
})

const assignmentsSchema = z.array(assignmentLocationSchema)

export const INITIAL_ASSIGNMENTS = range(1, 6).map(
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

export type Assignment = z.infer<typeof assignmentSchema>
export type AssignmentLocation = z.infer<typeof assignmentLocationSchema>

export const useAssignmentStorage = () => {
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

  const moveAssignment = (id: number, slotId: string) => {
    setAssignments((assignments) => {
      const currentAssignmentInfo = assignments.find(
        (assignment) => assignment.assignment.id === id
      )!

      const assignmentListWithoutMovedAssignment = assignments.filter(
        (assignment) => assignment.assignment.id !== id
      )

      const updatedAssignment = {
        ...currentAssignmentInfo,
        slotId,
      }

      return [...assignmentListWithoutMovedAssignment, updatedAssignment]
    })
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

  const unscheduleAll = () => {
    setAssignments((assignments) =>
      assignments.map((assignment) => ({
        ...assignment,
        slotId: ASSIGNMENT_LIST_SLOT_ID,
      }))
    )
  }

  const autoScheduleAssignmentsCallback = (workBlocks: WorkBlock[]) => {
    setAssignments((assignments) =>
      autoScheduleAssignments(assignments, workBlocks)
    )
  }

  const [assignments, setAssignments] = useRefreshingLocalStorage(
    "earlybird-assignments",
    assignmentsSchema,
    INITIAL_ASSIGNMENTS
  )

  return {
    assignments,
    updateAssignment,
    setEditing,
    createAssignment,
    deleteAssignment,
    moveAssignment,
    setAssignments,
    autoScheduleAssignments: autoScheduleAssignmentsCallback,
    unscheduleAll,
  }
}
