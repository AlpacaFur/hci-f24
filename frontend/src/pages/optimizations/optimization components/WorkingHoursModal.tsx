import React from "react"
import { useState } from "react"
import "./optimizationmodals.css"
import {
  TimePreferences,
  useTimePreferences,
} from "../../calendar/hooks/useTimePreferences"
import { useAssignmentStorage } from "../../calendar/hooks/useAssignments"
import { generateSlots } from "../../calendar/slotAlgorithm/generateSlots"
import { reschedule } from "../../calendar/slotAlgorithm/reschedule"
import { useEvents } from "../../calendar/hooks/useEvents"
import { DATES } from "../../calendar/calendar"

interface WorkingHoursModalProps {
  closeExtendHours: () => void
  doneExtendHours: () => void
}

const WorkingHours: React.FC<WorkingHoursModalProps> = ({
  closeExtendHours,
  doneExtendHours,
}) => {
  // Local state to hold user input for "from" and "to" times
  const [timePrefs, setTimePrefs] = useTimePreferences()
  const [fromHours, setFromHours] = useState(
    String(timePrefs.workingHours[2].start)
  )
  const [fromMinutes, setFromMinutes] = useState("00")
  const [fromPeriod, setFromPeriod] = useState("AM")

  const [toHours, setToHours] = useState(
    String(
      timePrefs.workingHours[2].end > 12
        ? timePrefs.workingHours[2].end - 12
        : timePrefs.workingHours[2].end
    )
  )
  const [toMinutes, setToMinutes] = useState("00")
  const [toPeriod, setToPeriod] = useState("PM")

  // Function to convert 12-hour time to 24-hour format
  const convertTo24Hour = (hours: string, minutes: string, period: string) => {
    let hoursIn24 = parseInt(hours)
    if (period === "PM" && hoursIn24 !== 12) {
      hoursIn24 += 12 // Add 12 for PM times, but keep 12 PM as 12
    } else if (period === "AM" && hoursIn24 === 12) {
      hoursIn24 = 0 // Convert 12 AM to 0 hours
    }
    return hoursIn24 // Return the 24-hour formatted hour
  }

  const { setAssignments } = useAssignmentStorage()
  const [events, setEvents] = useEvents()
  const handleSubmit = () => {
    // Convert the "From" and "To" times to 24-hour format using the simplified conversion
    const start = convertTo24Hour(fromHours, fromMinutes, fromPeriod)
    const end = convertTo24Hour(toHours, toMinutes, toPeriod)

    // Create the updated time preferences, and adjust displayStart/End Hours to match
    const updatedTimePreferences: TimePreferences = {
      ...timePrefs,
      displayStartHour: Math.max(
        0,
        [
          ...Object.values(timePrefs.workingHours).map(({ start }) => start),
          start,
        ].reduce((a, b) => Math.min(a, b)) - 1
      ),
      displayEndHour: Math.min(
        [
          ...Object.values(timePrefs.workingHours).map(({ end }) => end),
          end,
        ].reduce((a, b) => Math.max(a, b)) + 1,
        24
      ),
      workingHours: {
        ...timePrefs.workingHours,
        3: {
          start,
          end,
        },
      },
    }

    const currentWorkBlocks = generateSlots(DATES, events, timePrefs)
    const newWorkBlocks = generateSlots(DATES, events, updatedTimePreferences)
    setAssignments((currentAssignments) => {
      return reschedule(currentAssignments, currentWorkBlocks, newWorkBlocks)
    })
    console.log("Updated Time Preferences: ", updatedTimePreferences)
    setTimePrefs(updatedTimePreferences)
    doneExtendHours()

    // Log the updated time preferences before passing to next step
  }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="exit-button" onClick={closeExtendHours}>
          X
        </button>
        <h5> Extend Working Hours</h5>
        {/* From Time */}
        <div className="time-inputs">
          <label>From</label>
          <select
            value={fromHours}
            onChange={(e) => setFromHours(e.target.value)}
          >
            {[...Array(12).keys()].map((i) => (
              <option key={i} value={(i + 1).toString()}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
            value={fromMinutes}
            onChange={(e) => setFromMinutes(e.target.value)}
          >
            {[...Array(60).keys()].map((i) => (
              <option key={i} value={i.toString().padStart(2, "0")}>
                {i.toString().padStart(2, "0")}
              </option>
            ))}
          </select>
          <select
            value={fromPeriod}
            onChange={(e) => setFromPeriod(e.target.value)}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

        {/* To Time */}
        <div className="time-inputs">
          <label>To</label>
          <select value={toHours} onChange={(e) => setToHours(e.target.value)}>
            {[...Array(12).keys()].map((i) => (
              <option key={i} value={(i + 1).toString()}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
            value={toMinutes}
            onChange={(e) => setToMinutes(e.target.value)}
          >
            {[...Array(60).keys()].map((i) => (
              <option key={i} value={i.toString().padStart(2, "0")}>
                {i.toString().padStart(2, "0")}
              </option>
            ))}
          </select>
          <select
            value={toPeriod}
            onChange={(e) => setToPeriod(e.target.value)}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

        <button className="done-button" onClick={handleSubmit}>
          Done
        </button>
      </div>
    </div>
  )
}
export default WorkingHours
