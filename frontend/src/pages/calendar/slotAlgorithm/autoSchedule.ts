import { WorkBlock } from "../calendarTypes"
import { getMinuteDifference } from "../dates/dateUtils"
import { ASSIGNMENT_LIST_SLOT_ID } from "../dragAndDrop/AssignmentList"
// import { ASSIGNMENT_LIST_SLOT_ID } from "../dragAndDrop/AssignmentList"
import { AssignmentLocation } from "../hooks/useAssignments"

const ASSIGNMENT_SPACING_MINS = 5
const TIME_SLOT_PADDING = 15 * 2

export const autoScheduleAssignments = (
  assignments: AssignmentLocation[],
  workBlocks: WorkBlock[]
): AssignmentLocation[] => {
  const unscheduledAssignments = assignments
    .filter((assignment) => assignment.slotId === ASSIGNMENT_LIST_SLOT_ID)
    .sort((a, b) => b.assignment.minuteLength - a.assignment.minuteLength)

  const blockIndexPairings: [WorkBlock, number][] = workBlocks.map(
    (workBlock, index) => [workBlock, index]
  )

  const capacities = workBlocks.map(({ id, start, end }) => {
    const currentAssignments = assignments.filter(
      (assignment) => Number(assignment.slotId) === id
    )

    const totalAssignmentLength = currentAssignments
      .map((assignment) => assignment.assignment.minuteLength + 16)
      .reduce((a, b) => a + b, 0)

    const assignmentGaps =
      ASSIGNMENT_SPACING_MINS * (currentAssignments.length - 1)

    const currentUsed =
      totalAssignmentLength + assignmentGaps + TIME_SLOT_PADDING

    const remaining = getMinuteDifference(end, start) - currentUsed

    return remaining
  })

  const assignmentsPerBlock = workBlocks.map(({ id }) =>
    assignments.reduce(
      (total, assignment) => total + (Number(assignment.slotId) === id ? 1 : 0),
      0
    )
  )

  const scheduledAssignments = assignments.filter(
    (assignment) => assignment.slotId !== ASSIGNMENT_LIST_SLOT_ID
  )

  const newlyScheduled = unscheduledAssignments.map((assignment) => {
    const length =
      assignment.assignment.minuteLength + 16 + ASSIGNMENT_SPACING_MINS

    const sortedBlocks = [...blockIndexPairings].sort((blockA, blockB) => {
      return assignmentsPerBlock[blockA[1]] - assignmentsPerBlock[blockB[1]]
    })

    const arrayIndex = sortedBlocks.findIndex(([, realIndex]) => {
      return capacities[realIndex] >= length
    })

    if (arrayIndex === -1) {
      return assignment
    }

    const firstFittingBinIndex = sortedBlocks[arrayIndex][1]

    assignmentsPerBlock[firstFittingBinIndex] += 1
    capacities[firstFittingBinIndex] -= length

    return {
      ...assignment,
      slotId: String(workBlocks[firstFittingBinIndex].id),
    }
  })

  console.log([...scheduledAssignments, ...newlyScheduled])

  return [...scheduledAssignments, ...newlyScheduled]
}
