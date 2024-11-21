import { WorkBlock } from "../calendarTypes"
import { Event } from "../calendarTypes"

export function dateToTime(date: Date) {
  const dayPeriod = date.getHours() < 12 ? "am" : "pm"
  const convertedHour = date.getHours() === 12 ? 12 : date.getHours() % 12

  if (date.getMinutes() === 0) {
    return `${convertedHour}${dayPeriod}`
  } else {
    return `${convertedHour}:${String(date.getMinutes()).padStart(
      2,
      "0"
    )}${dayPeriod}`
  }
}

export function calculateEventBoundingBox(
  { end, start }: WorkBlock,
  startOffsetHours: number
) {
  const length = end.getTime() - start.getTime()

  const startOfDayDate = getStartOfDayTime(start, startOffsetHours)

  return {
    height: length / 1000 / 60,
    top: (start.getTime() - startOfDayDate.getTime()) / 1000 / 60,
  }
}

export function getStartOfDayTime(date: Date, startOffsetHours: number): Date {
  const startOfDayDate = new Date(date)
  startOfDayDate.setHours(Math.floor(startOffsetHours))
  startOfDayDate.setMinutes(
    (startOffsetHours - Math.floor(startOffsetHours)) * 60
  )
  startOfDayDate.setSeconds(0)

  return startOfDayDate
}

export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + 1000 * 60 * minutes)
}
export function getMinuteDifference(dateA: Date, dateB: Date): number {
  return (dateA.getTime() - dateB.getTime()) / 1000 / 60
}
export function updateTimeFromCoordDelta(
  deltaX: number,
  deltaY: number,
  event: Event
  // startOfDayDate: Date
): Event {
  const { start, end } = event

  const newStart = start.getTime() + deltaY * 1000 * 60 + deltaX * millisPerDay
  const newStartDate = new Date(newStart)
  newStartDate.setMinutes(roundToNearestInterval(newStartDate.getMinutes(), 15))

  const newEnd = end.getTime() + deltaY * 1000 * 60 + deltaX * millisPerDay
  const newEndDate = new Date(newEnd)
  newEndDate.setMinutes(roundToNearestInterval(newEndDate.getMinutes(), 15))

  return {
    ...event,
    start: newStartDate,
    end: newEndDate,
  }
}
export function roundToNearestInterval(value: number, interval: number) {
  return Math.round(value / interval) * interval
}
export const millisPerDay = (1000 * 60 * 60 * 24) / 150

export function toISODate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate() + 1).padStart(2, "0")}`
}

export function minutesToDisplayDate(minutes: number) {
  if (minutes < 60) {
    return `${minutes}m`
  } else {
    return `${minutes / 60}h`
  }
}
