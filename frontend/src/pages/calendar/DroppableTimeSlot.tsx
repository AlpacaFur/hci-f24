import { useDroppable } from "@dnd-kit/core"
import { WorkBlock } from "./calendarTypes"
import { calculateEventBoundingBox } from "./dateUtils"
import { PropsWithChildren } from "react"

export const DroppableTimeSlot: React.FC<
  PropsWithChildren<{
    workBlock: WorkBlock
    startOffsetHours: number
  }>
> = ({ workBlock, startOffsetHours, children }) => {
  const { height, top } = calculateEventBoundingBox(workBlock, startOffsetHours)

  const { setNodeRef, isOver } = useDroppable({ id: workBlock.id })

  return (
    <div
      className={"work-zone" + (isOver ? " hovering" : "")}
      style={{ height, top }}
      ref={setNodeRef}
    >
      {children}
    </div>
  )
}
