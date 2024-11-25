import { forwardRef } from "react"
import { Event } from "../calendarTypes"
import { TimePreferences } from "../hooks/useTimePrefs"
import { DraggableEvent } from "../dragAndDrop/DraggableEvent"
import { range } from "../range"

export const CalendarEvents = forwardRef<
  HTMLDivElement,
  { dates: Date[]; events: Event[]; timePreferences: TimePreferences }
>(({ dates, events, timePreferences }, ref) => {
  return (
    <div className="calendar-body" ref={ref}>
      {dates.map((date) => {
        // TODO: make these checks more robust
        const eventsForDay = events.filter(
          ({ start }) => start.getDate() === date.getDate()
        )

        return (
          <div key={date.getTime()} className="day-column">
            {range(
              timePreferences.displayStartHour,
              timePreferences.displayEndHour
            ).map((num) => (
              <div key={num} className="calendar-background-cell"></div>
            ))}
            {eventsForDay.map((event) => (
              <DraggableEvent
                event={event}
                key={event.start.getTime()}
                startOffsetHours={timePreferences.displayStartHour}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
})
