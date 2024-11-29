import { WorkBlock } from "../calendarTypes"
import { ASSIGNMENT_LIST_SLOT_ID } from "../dragAndDrop/AssignmentList"
import { AssignmentLocation } from "../hooks/useAssignments"
import { autoScheduleAssignments } from "./autoSchedule"

const blocksMatch = (blockA: WorkBlock, blockB: WorkBlock) => {
  return (
    blockA.start.getTime() === blockB.start.getTime() &&
    blockA.end.getTime() === blockB.end.getTime()
  )
}

const sharesStartOrEndTime = (blockA: WorkBlock, blockB: WorkBlock) => {
  return (
    blockA.start.getTime() === blockB.start.getTime() ||
    blockA.end.getTime() === blockB.end.getTime()
  )
}

interface DeletedBlock {
  type: "deleted"
  oldId: number
}

interface SplitBlock {
  type: "split"
  oldId: number
  newIdA: number
  newIdB: number
}

interface JoinedBlock {
  type: "joined"
  oldIdA: number
  oldIdB: number
  newId: number
}

interface ShrunkBlock {
  type: "shrunk"
  oldId: number
  newId: number
}

interface GrownBlock {
  type: "grown"
  oldId: number
  newId: number
}

interface NewBlock {
  type: "new"
  newId: number
}

type ClassifiedBlock =
  | DeletedBlock
  | SplitBlock
  | JoinedBlock
  | ShrunkBlock
  | GrownBlock
  | NewBlock

const predicateFromProperties = (properties: Partial<WorkBlock>) => {
  return (block: WorkBlock) => {
    if (properties.id !== undefined && block.id !== properties.id) {
      return false
    }
    if (
      properties.start !== undefined &&
      block.start.getTime() !== properties.start.getTime()
    ) {
      return false
    }
    if (
      properties.end !== undefined &&
      block.end.getTime() !== properties.end.getTime()
    ) {
      return false
    }

    return true
  }
}

const blockQueryFind = (
  blocks: WorkBlock[],
  properties: Partial<WorkBlock>
) => {
  return blocks.find(predicateFromProperties(properties))
}

const removeIds = (blocks: WorkBlock[], ids: number[]) => {
  return blocks.filter((block) => {
    return !ids.includes(block.id)
  })
}

const classifyUnassociatedBlocks = (
  oldBlocks: WorkBlock[],
  newBlocks: WorkBlock[]
): ClassifiedBlock[] => {
  const classifiedBlocks: ClassifiedBlock[] = []

  let mutableOldBlocks = [...oldBlocks]
  let mutableNewBlocks = [...newBlocks]

  // Deleted
  mutableOldBlocks.forEach((oldBlock) => {
    const noMatch = !mutableNewBlocks.some((newBlock) =>
      sharesStartOrEndTime(oldBlock, newBlock)
    )

    if (noMatch) {
      mutableOldBlocks = removeIds(mutableOldBlocks, [oldBlock.id])
      classifiedBlocks.push({ type: "deleted", oldId: oldBlock.id })
    }
  })

  // Split
  mutableOldBlocks.forEach((oldBlock) => {
    const blockStartingWithOldStart = blockQueryFind(mutableNewBlocks, {
      start: oldBlock.start,
    })
    const blockEndingWithOldEnd = blockQueryFind(mutableNewBlocks, {
      end: oldBlock.end,
    })

    if (
      blockStartingWithOldStart !== undefined &&
      blockEndingWithOldEnd !== undefined
    ) {
      classifiedBlocks.push({
        type: "split",
        oldId: oldBlock.id,
        newIdA: blockStartingWithOldStart.id,
        newIdB: blockEndingWithOldEnd.id,
      })

      mutableOldBlocks = removeIds(mutableOldBlocks, [oldBlock.id])
      mutableNewBlocks = removeIds(mutableNewBlocks, [
        blockStartingWithOldStart.id,
        blockEndingWithOldEnd.id,
      ])
    }
  })

  // Joined
  mutableNewBlocks.forEach((newBlock) => {
    const blockStartingWithNewStart = blockQueryFind(mutableOldBlocks, {
      start: newBlock.start,
    })
    const blockEndingWithNewEnd = blockQueryFind(mutableOldBlocks, {
      end: newBlock.end,
    })

    if (
      blockStartingWithNewStart !== undefined &&
      blockEndingWithNewEnd !== undefined
    ) {
      classifiedBlocks.push({
        type: "joined",
        oldIdA: blockStartingWithNewStart.id,
        oldIdB: blockEndingWithNewEnd.id,
        newId: newBlock.id,
      })

      mutableOldBlocks = removeIds(mutableOldBlocks, [
        blockStartingWithNewStart.id,
        blockEndingWithNewEnd.id,
      ])
      mutableNewBlocks = removeIds(mutableNewBlocks, [newBlock.id])
    }
  })

  // Shrunk / Grow
  mutableOldBlocks.forEach((oldBlock) => {
    const newBlockWithSameStart = blockQueryFind(mutableNewBlocks, {
      start: oldBlock.start,
    })

    if (newBlockWithSameStart !== undefined) {
      if (newBlockWithSameStart.end.getTime() > oldBlock.end.getTime()) {
        classifiedBlocks.push({
          type: "grown",
          oldId: oldBlock.id,
          newId: newBlockWithSameStart.id,
        })
      } else {
        classifiedBlocks.push({
          type: "shrunk",
          oldId: oldBlock.id,
          newId: newBlockWithSameStart.id,
        })
      }

      mutableOldBlocks = removeIds(mutableOldBlocks, [oldBlock.id])
      mutableNewBlocks = removeIds(mutableNewBlocks, [newBlockWithSameStart.id])
      return
    }

    const newBlockWithSameEnd = blockQueryFind(mutableNewBlocks, {
      end: oldBlock.end,
    })

    if (newBlockWithSameEnd !== undefined) {
      if (newBlockWithSameEnd.start.getTime() < oldBlock.start.getTime()) {
        classifiedBlocks.push({
          type: "grown",
          oldId: oldBlock.id,
          newId: newBlockWithSameEnd.id,
        })
      } else {
        classifiedBlocks.push({
          type: "shrunk",
          oldId: oldBlock.id,
          newId: newBlockWithSameEnd.id,
        })
      }

      mutableOldBlocks = removeIds(mutableOldBlocks, [oldBlock.id])
      mutableNewBlocks = removeIds(mutableNewBlocks, [newBlockWithSameEnd.id])
    }
  })

  // New
  mutableNewBlocks.forEach((newBlock) => {
    classifiedBlocks.push({
      type: "new",
      newId: newBlock.id,
    })
  })

  return classifiedBlocks
}

export const reschedule = (
  assignments: AssignmentLocation[],
  currentWorkBlocks: WorkBlock[],
  newWorkBlocks: WorkBlock[]
): AssignmentLocation[] => {
  const blockAssociations: Record<number, number | string> = {}

  const unassociatedCurrentBlocks: WorkBlock[] = []

  currentWorkBlocks.forEach((currentBlock) => {
    const matchingBlock = newWorkBlocks.find((newBlock) =>
      blocksMatch(currentBlock, newBlock)
    )
    if (matchingBlock !== undefined) {
      blockAssociations[currentBlock.id] = matchingBlock.id
    } else {
      unassociatedCurrentBlocks.push(currentBlock)
    }
  })

  const associatedNewBlockIds = new Set(Object.values(blockAssociations))
  const unassociatedNewBlocks = newWorkBlocks.filter(
    (newBlock) => !associatedNewBlockIds.has(newBlock.id)
  )

  const classifiedUnassociatedBlocks = classifyUnassociatedBlocks(
    unassociatedCurrentBlocks,
    unassociatedNewBlocks
  )

  classifiedUnassociatedBlocks.forEach((classifiedBlock) => {
    if (classifiedBlock.type === "deleted") {
      blockAssociations[classifiedBlock.oldId] = ASSIGNMENT_LIST_SLOT_ID
    } else if (classifiedBlock.type === "joined") {
      blockAssociations[classifiedBlock.oldIdA] = classifiedBlock.newId
      blockAssociations[classifiedBlock.oldIdB] = classifiedBlock.newId
    } else if (classifiedBlock.type === "grown") {
      blockAssociations[classifiedBlock.oldId] = classifiedBlock.newId
    }
  })

  const remappedAssignments: AssignmentLocation[] = assignments.map(
    (assignment) => ({
      ...assignment,
      slotId: String(
        blockAssociations[Number(assignment.slotId)] ?? ASSIGNMENT_LIST_SLOT_ID
      ),
    })
  )

  const assignmentAssociations: Record<number, string> = {}

  classifiedUnassociatedBlocks
    .filter((classifiedBlock) => classifiedBlock.type === "split")
    .forEach((classifiedBlock) => {
      const oldContents = assignments.filter(
        (assignment) => Number(assignment.slotId) === classifiedBlock.oldId
      )

      const newBlockA = newWorkBlocks.find(
        (block) => block.id === classifiedBlock.newIdA
      )!
      const newBlockB = newWorkBlocks.find(
        (block) => block.id === classifiedBlock.newIdB
      )!

      const rescheduled = autoScheduleAssignments(
        oldContents.map((assignment) => ({
          ...assignment,
          slotId: ASSIGNMENT_LIST_SLOT_ID,
        })),
        [newBlockA, newBlockB],
        false
      )
      rescheduled.forEach((assignment) => {
        assignmentAssociations[assignment.assignment.id] = assignment.slotId
      })
    })

  const reremappedAssignments: AssignmentLocation[] = remappedAssignments.map(
    (assignment) => ({
      ...assignment,
      slotId: String(
        assignmentAssociations[assignment.assignment.id] ?? assignment.slotId
      ),
    })
  )

  const shrunkAssignmentAssociations: Record<number, string> = {}

  classifiedUnassociatedBlocks
    .filter((classifiedBlock) => classifiedBlock.type === "shrunk")
    .forEach((classifiedBlock) => {
      const oldContents = assignments.filter(
        (assignment) => Number(assignment.slotId) === classifiedBlock.oldId
      )

      const newBlock = newWorkBlocks.find(
        (block) => block.id === classifiedBlock.newId
      )!

      const rescheduled = autoScheduleAssignments(
        oldContents.map((assignment) => ({
          ...assignment,
          slotId: ASSIGNMENT_LIST_SLOT_ID,
        })),
        [newBlock]
      )

      rescheduled.forEach((assignment) => {
        shrunkAssignmentAssociations[assignment.assignment.id] =
          assignment.slotId
      })

      const fullyScheduled = rescheduled.filter(
        (assignment) => assignment.slotId !== ASSIGNMENT_LIST_SLOT_ID
      )

      const unscheduled = rescheduled.filter(
        (assignment) => assignment.slotId === ASSIGNMENT_LIST_SLOT_ID
      )

      const grownOrNewBlocksOnSameDay = classifiedUnassociatedBlocks
        .filter((block) => block.type === "grown" || block.type === "new")
        .map(
          (block) =>
            newWorkBlocks.find((newBlock) => newBlock.id === block.newId)!
        )
        .filter((block) => block.start.getDate() === newBlock.start.getDate())

      const rerescheduled = autoScheduleAssignments(
        [
          ...fullyScheduled,
          ...unscheduled.map((assignment) => ({
            ...assignment,
            slotId: ASSIGNMENT_LIST_SLOT_ID,
          })),
        ],
        [...grownOrNewBlocksOnSameDay]
      )

      rerescheduled.forEach((assignment) => {
        shrunkAssignmentAssociations[assignment.assignment.id] =
          assignment.slotId
      })
    })

  const finalMappedAssignments: AssignmentLocation[] =
    reremappedAssignments.map((assignment) => ({
      ...assignment,
      slotId: String(
        shrunkAssignmentAssociations[assignment.assignment.id] ??
          assignment.slotId
      ),
    }))

  return finalMappedAssignments
}
