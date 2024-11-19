import { useDraggable } from "@dnd-kit/core"
import { calculateEventBoundingBox, dateToTime } from "./dateUtils"
import { Event } from "./calendarTypes"

export const DraggableEvent: React.FC<{
  event: Event
  startOffsetHours: number
}> = ({ event, startOffsetHours }) => {
  const { id, start, end, name } = event

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    })

  const { height, top } = calculateEventBoundingBox(event, startOffsetHours)

  return (
    <div
      ref={setNodeRef}
      className={"event" + (height <= 100 ? " short" : "")}
      {...listeners}
      {...attributes}
      style={{
        height,
        top,
        transform: `translate(${transform?.x}px, ${transform?.y}px) scale(${
          isDragging ? 1.05 : 1
        })`,
        boxShadow: `0px 0px ${isDragging ? 10 : 0}px 0px purple`,
        zIndex: isDragging ? 2 : 1,
      }}
    >
      <p className="classTitle">{name}</p>
      {isDragging && <div className="datePlaceholder"></div>}
      {!isDragging && (
        <p className="timeLabel">
          {dateToTime(start)} - {dateToTime(end)}
        </p>
      )}
    </div>
  )
}
