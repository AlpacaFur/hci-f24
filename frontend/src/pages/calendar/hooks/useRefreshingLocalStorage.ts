import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { z } from "zod"

type Result<T> = { success: true; data: T } | { success: false }
function ok<T>(value: T): Result<T> {
  return { success: true, data: value }
}

function err<T>(): Result<T> {
  return { success: false }
}

function tryJSONParse(value: string): Result<unknown> {
  try {
    return ok(JSON.parse(value))
  } catch {
    return err()
  }
}

const tryDeserialize = <T>(
  value: string,
  schema: z.ZodSchema<T>
): Result<T> => {
  const maybeParsed = tryJSONParse(value)
  if (!maybeParsed.success) return err()

  const maybeValidated = schema.safeParse(maybeParsed.data)
  if (maybeValidated.success) {
    return ok(maybeValidated.data)
  } else {
    console.error(maybeValidated.error)
    return err()
  }
}

export const useRefreshingLocalStorage = <T>(
  key: string,
  schema: z.ZodSchema<T>,
  initialValue: T,
  checkInterval: number = 500
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(initialValue)
  const lastDeserializedValue = useRef(JSON.stringify(value))

  const syncLocalStorage = useCallback(() => {
    const currentLocalValue = localStorage.getItem(key)

    if (currentLocalValue === null) {
      localStorage.setItem(key, lastDeserializedValue.current)
      return
    }
    if (lastDeserializedValue.current === currentLocalValue) return

    const deserialized = tryDeserialize(currentLocalValue, schema)

    if (deserialized.success) {
      setValue(deserialized.data)
    } else {
      throw new Error("Failed to deserialize events!")
    }
  }, [key, schema])

  useEffect(() => {
    syncLocalStorage()
    const interval = setInterval(syncLocalStorage, checkInterval)

    return () => {
      clearInterval(interval)
    }
  }, [checkInterval, syncLocalStorage])

  const serializeValue = (value: T) => {
    const serialized = JSON.stringify(value)
    localStorage.setItem(key, serialized)
    lastDeserializedValue.current = serialized
  }

  const wrappedSetValue: Dispatch<SetStateAction<T>> = (
    update: SetStateAction<T>
  ) => {
    if (typeof update === "function") {
      setValue((currentValue) => {
        const newValue = (update as (current: T) => T)(currentValue)
        serializeValue(newValue)
        return newValue
      })
    } else {
      serializeValue(update)
      setValue(update)
    }
  }

  return [value, wrappedSetValue]
}
