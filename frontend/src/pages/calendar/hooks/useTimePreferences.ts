import { z } from "zod"
import { useRefreshingLocalStorage } from "./useRefreshingLocalStorage"

const workingHoursSchema = z.object({ start: z.number(), end: z.number() })

const timePreferenecesSchema = z.object({
  displayStartHour: z.number(),
  displayEndHour: z.number(),
  minimumBlockSizeMinutes: z.number(),
  transitionTimeMinutes: z.number(),
  workingHours: z.object({
    0: workingHoursSchema,
    1: workingHoursSchema,
    2: workingHoursSchema,
    3: workingHoursSchema,
    4: workingHoursSchema,
    5: workingHoursSchema,
    6: workingHoursSchema,
  }),
})

export type TimePreferences = z.infer<typeof timePreferenecesSchema>

const DEFAULT_TIME_PREFERENCES: TimePreferences = {
  displayStartHour: 9,
  displayEndHour: 21,
  minimumBlockSizeMinutes: 30,
  transitionTimeMinutes: 10,
  workingHours: {
    0: {
      start: 10,
      end: 17,
    },
    1: {
      start: 11,
      end: 20,
    },
    2: {
      start: 10,
      end: 20,
    },
    3: {
      start: 10,
      end: 20,
    },
    4: {
      start: 10,
      end: 20,
    },
    5: {
      start: 10,
      end: 20,
    },
    6: {
      start: 10,
      end: 17,
    },
  },
}

export const useTimePreferences = () => {
  return useRefreshingLocalStorage(
    "earlybird-timepreferences",
    timePreferenecesSchema,
    DEFAULT_TIME_PREFERENCES
  )
}
