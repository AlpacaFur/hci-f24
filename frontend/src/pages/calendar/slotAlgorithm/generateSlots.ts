import { WorkBlock, Event } from "../calendarTypes"
import {
  addMinutes,
  getMinuteDifference,
  getStartOfDayTime,
} from "../dates/dateUtils"

export interface TimePreferences {
  displayStartHour: number
  displayEndHour: number
  workingStartHour: number
  workingEndHour: number
  minimumBlockSizeMinutes: number
  transitionTimeMinutes: number
}

export const generateSlots = (
  dates: Date[],
  events: Event[],
  {
    workingStartHour,
    workingEndHour,
    transitionTimeMinutes,
    minimumBlockSizeMinutes,
  }: TimePreferences
): WorkBlock[] => {
  const newFreeSlots: WorkBlock[] = []
  let id = 0
  dates.forEach((date) => {
    const eventsOnDate = events.filter(
      (event) => event.start.getDate() === date.getDate()
    )
    eventsOnDate.sort((a, b) => a.start.getTime() - b.start.getTime())
    const startOfDayDate = getStartOfDayTime(date, workingStartHour)
    const endOfDayDate = getStartOfDayTime(date, workingEndHour)

    eventsOnDate.forEach((event, index) => {
      if (index === 0) {
        if (
          getMinuteDifference(event.start, startOfDayDate) >
          minimumBlockSizeMinutes + transitionTimeMinutes
        ) {
          newFreeSlots.push({
            id: id++,
            start: startOfDayDate,
            end: addMinutes(event.start, -transitionTimeMinutes),
          })
        }
      } else {
        const prevEvent = eventsOnDate[index - 1]

        if (
          getMinuteDifference(event.start, prevEvent.end) >
          minimumBlockSizeMinutes + transitionTimeMinutes * 2
        ) {
          newFreeSlots.push({
            id: id++,
            start: addMinutes(prevEvent.end, transitionTimeMinutes),
            end: addMinutes(event.start, -transitionTimeMinutes),
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
        newFreeSlots.push({
          id: id++,
          start: addMinutes(lastEvent.end, transitionTimeMinutes),
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
