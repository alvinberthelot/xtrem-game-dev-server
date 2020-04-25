import { Observable, timer } from "rxjs"
import { map, take } from "rxjs/operators"

export const SECOND = 1000
export const DURATION_5S = 5 * SECOND
export const DURATION_10S = 10 * SECOND

export interface Metronome {
  name: string
  frequency: number
  step: number
}

export function metronome$(
  name: string,
  frequency: number,
  numSteps: number
): Observable<Metronome> {
  return timer(0, frequency).pipe(
    take(numSteps),
    map((step) => ({
      name,
      frequency,
      step,
    }))
  )
}
