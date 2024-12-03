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
    name: "Improv",
    start: new Date("2024-11-13 10:30"),
    end: new Date("2024-11-13 11:30"),
    id: 2,
  },
  {
    name: "Improv",
    start: new Date("2024-11-14 10:30"),
    end: new Date("2024-11-14 11:30"),
    id: 3,
  },
  {
    name: "HCI",
    start: new Date("2024-11-12 11:45"),
    end: new Date("2024-11-12 13:25"),
    id: 4,
  },
  {
    name: "HCI",
    start: new Date("2024-11-14 14:30"),
    end: new Date("2024-11-14 16:30"),
    id: 5,
  },
  {
    name: "Networks",
    start: new Date("2024-11-11 14:30"),
    end: new Date("2024-11-11 16:30"),
    id: 6,
  },
  {
    name: "DS2000",
    start: new Date("2024-11-12 14:00"),
    end: new Date("2024-11-12 17:30"),
    id: 8,
  },
  {
    name: "DS2000",
    start: new Date("2024-11-15 14:00"),
    end: new Date("2024-11-15 17:30"),
    id: 9,
  },
]

export const useEvents = () => {
  return useRefreshingLocalStorage(
    "earlybird-events",
    eventsSchema,
    initialEvents
  )
}
