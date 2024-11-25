export interface TimePreferences {
  displayStartHour: number
  displayEndHour: number
  minimumBlockSizeMinutes: number
  transitionTimeMinutes: number
  workingHours: {
    0: { start: number; end: number }
    1: { start: number; end: number }
    2: { start: number; end: number }
    3: { start: number; end: number }
    4: { start: number; end: number }
    5: { start: number; end: number }
    6: { start: number; end: number }
  }
}

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
  return DEFAULT_TIME_PREFERENCES
}
