import { useDraggable } from "@dnd-kit/core"
import { EditAssignmentModal } from "../editModal/EditAssignmentModal"
import { minutesToDisplayDate } from "../dates/dateUtils"

export interface Assignment {
  title: string
  id: number
  className: string
  dueDate: Date
  minuteLength: number
  priority: -1 | 0 | 1
}

export const DraggableAssignment: React.FC<{
  assignment: Assignment
  updateAssignment: (assignment: Partial<Assignment>) => void
  setEditing: (editing: boolean) => void
  editing: boolean
  deleteAssignment: () => void
}> = ({
  assignment,
  updateAssignment,
  editing,
  setEditing,
  deleteAssignment,
}) => {
  const { id, title, className, minuteLength } = assignment

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
        style={{
          height: minuteLength,
        }}
        onClick={() => setEditing(!editing)}
        ref={setActivatorNodeRef}
      >
        <p className="title">{title}</p>
        <div>
          <p className="class">{className}</p>
          <p className="size">{minutesToDisplayDate(minuteLength)}</p>
        </div>
      </div>
      <EditAssignmentModal
        assignment={assignment}
        updateAssignment={updateAssignment}
        hide={() => setEditing(false)}
        isShown={editing}
        deleteAssignment={deleteAssignment}
      />
    </div>
  )
}
