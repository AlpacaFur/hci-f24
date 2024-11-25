import { useState } from "react"
import { Assignment } from "../dragAndDrop/DraggableAssignment"
import { AssignmentLocation } from "../calendar"
import { range } from "../range"

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
    setAssignments((assignments) =>
      assignments.map((assignment) => {
        if (assignment.assignment.id === id) {
          return { ...assignment, slotId }
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

  return {
    assignments,
    updateAssignment,
    setEditing,
    createAssignment,
    deleteAssignment,
    moveAssignment,
  }
}
