import padStart from "lodash/padStart"

export function assert(value: boolean, message?: string): asserts value
export function assert<T>(
  value: T | null | undefined,
  message?: string
): asserts value is T
export function assert(value: any, message?: string) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message || "Assertion failed")
  }
}

export function secondsToTimestamp(s: number) {
  const min = Math.floor((s / 60) << 0).toString()
  const sec = Math.floor(s % 60).toString()
  return `${padStart(min, 2, "0")}:${padStart(sec, 2, "0")}`
}
