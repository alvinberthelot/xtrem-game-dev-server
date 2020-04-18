import { Observable, timer } from "rxjs"

const METRONOME_FREQUENCY = 1000

export function scheduler(): Observable<any> {
  return timer(0, METRONOME_FREQUENCY)
}
