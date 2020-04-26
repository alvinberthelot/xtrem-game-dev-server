import { Observable } from "rxjs"
import { map, takeUntil, skipUntil } from "rxjs/operators"

export const SECOND = 1000
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR
export const DURATION_5S = 5 * SECOND
export const DURATION_10S = 10 * SECOND

export function createSmartTimer$(params: {
  timer$: Observable<number>
  toStart$: Observable<any>
  toStop$: Observable<any>
}): Observable<number> {
  return params.timer$.pipe(
    skipUntil(params.toStart$),
    map((indexTimer, index) => index),
    takeUntil(params.toStop$)
  )
}
