import { Event } from "../calendarTypes"
import { z } from "zod"
import { useRefreshingLocalStorage } from "./useRefreshingLocalStorage"

const eventsSchema = z.array(
  z.object({
    name: z.string(),
    start: z.coerce.date(),
    end: z.coerce.date(),
    id: z.number(),
  })
)

const initialEvents: Event[] = [
  {
    name: "Cool Event",
    start: new Date("2024-11-12 15:30"),
    end: new Date("2024-11-12 18:30"),
    id: 1,
  },
  {
    name: "Cool Event 2",
    start: new Date("2024-11-13 09:30"),
    end: new Date("2024-11-13 10:30"),
    id: 2,
  },
  {
    name: "Cool Event 3",
    start: new Date("2024-11-15 13:30"),
    end: new Date("2024-11-15 14:30"),
    id: 3,
  },
]

export const useEvents = () => {
  return useRefreshingLocalStorage(
    "earlybird-events",
    eventsSchema,
    initialEvents
  )
}
