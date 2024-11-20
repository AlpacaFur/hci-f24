import { useDraggable } from "@dnd-kit/core"
import { useState } from "react"

export interface Assignment {
  title: string
  id: number
  className: string
  minuteLength: number
}

export const DraggableAssignment: React.FC<{ assignment: Assignment }> = ({
  assignment: { id, title, className, minuteLength },
}) => {
  const [editing, setEditing] = useState(false)

  const { attributes, listeners, setNodeRef, isDragging, setActivatorNodeRef } =
    useDraggable({ id })

  return (
    <div
      {...attributes}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
      ref={setNodeRef}
      className="assignment"
    >
      <div
        {...listeners}
        className="assignment-content"
        onClick={() => setEditing((editing) => !editing)}
        ref={setActivatorNodeRef}
      >
        <p className="title">{title}</p>
        <div>
          <p className="class">{className}</p>
          <p className="size">{minuteLength}</p>
        </div>
      </div>
      <div className={"assignment-edit-modal" + (editing ? " editing" : "")}>
        <div className="header">
          <h3>Edit Assignment</h3>
          <button
            onClick={(event) => {
              setEditing(false)
              event.preventDefault()
            }}
          >
            ✗
          </button>
        </div>
        <p>123 abc</p>
      </div>
    </div>
  )
}
