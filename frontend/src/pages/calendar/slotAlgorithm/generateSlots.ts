import { WorkBlock, Event } from "../calendarTypes"
import {
  addMinutes,
  getMinuteDifference,
  getStartOfDayTime,
} from "../dates/dateUtils"
import { TimePreferences } from "../hooks/useTimePreferences"

export const generateSlots = (
  dates: Date[],
  events: Event[],
  {
    transitionTimeMinutes,
    minimumBlockSizeMinutes,
    workingHours: allWorkingHours,
  }: TimePreferences
): WorkBlock[] => {
  const newFreeSlots: WorkBlock[] = []
  let id = 0
  dates.forEach((date) => {
    const workingHours =
      allWorkingHours[date.getDay() as keyof TimePreferences["workingHours"]]

    const eventsOnDate = events.filter(
      (event) => event.start.getDate() === date.getDate()
    )
    eventsOnDate.sort((a, b) => a.start.getTime() - b.start.getTime())
    const startOfDayDate = getStartOfDayTime(date, workingHours.start)
    const endOfDayDate = getStartOfDayTime(date, workingHours.end)

    eventsOnDate.forEach((event, index) => {
      if (index === 0) {
        if (
          getMinuteDifference(event.start, startOfDayDate) >
          minimumBlockSizeMinutes + transitionTimeMinutes
        ) {
          const minEventStartAndEOD = new Date(
            Math.min(
              addMinutes(event.start, -transitionTimeMinutes).getTime(),
              endOfDayDate.getTime()
            )
          )

          newFreeSlots.push({
            id: id++,
            start: startOfDayDate,
            end: minEventStartAndEOD,
          })
        }
      } else {
        const prevEvent = eventsOnDate[index - 1]

        const basePrevEventEnd = addMinutes(
          prevEvent.end,
          transitionTimeMinutes
        )

        const maxEventEndAndStartOfDay = new Date(
          Math.max(basePrevEventEnd.getTime(), startOfDayDate.getTime())
        )

        const baseNextEventStart = addMinutes(
          event.start,
          -transitionTimeMinutes
        )

        const minEventStartAndEOD = new Date(
          Math.min(baseNextEventStart.getTime(), endOfDayDate.getTime())
        )

        const truncatedAtStart =
          maxEventEndAndStartOfDay.getTime() > basePrevEventEnd.getTime()
        const truncatedAtEnd =
          minEventStartAndEOD.getTime() < baseNextEventStart.getTime()

        const totalTransitionTime =
          2 - [truncatedAtStart, truncatedAtEnd].filter((x) => x).length

        if (
          getMinuteDifference(minEventStartAndEOD, maxEventEndAndStartOfDay) >
          minimumBlockSizeMinutes + totalTransitionTime
        ) {
          newFreeSlots.push({
            id: id++,
            start: maxEventEndAndStartOfDay,
            end: minEventStartAndEOD,
          })
        }
      }
    })

    if (eventsOnDate.length >= 1) {
      const lastEvent = eventsOnDate[eventsOnDate.length - 1]
      if (
        getMinuteDifference(endOfDayDate, lastEvent.end) >
        transitionTimeMinutes + minimumBlockSizeMinutes
      ) {
        const maxEventEndAndStartOfDay = new Date(
          Math.max(
            addMinutes(lastEvent.end, transitionTimeMinutes).getTime(),
            startOfDayDate.getTime()
          )
        )

        newFreeSlots.push({
          id: id++,
          start: maxEventEndAndStartOfDay,
          end: endOfDayDate,
        })
      }
    } else if (eventsOnDate.length === 0) {
      newFreeSlots.push({
        id: id++,
        start: startOfDayDate,
        end: endOfDayDate,
      })
    }
  })
  return newFreeSlots
}
