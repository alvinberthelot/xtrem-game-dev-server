import {
  HttpMiddlewareEffect,
  HttpRequest,
} from "@marblejs/core"
import { Observable } from "rxjs"
import { tap } from "rxjs/operators"

export const logger$: HttpMiddlewareEffect = (
  req$
): Observable<HttpRequest> =>
  req$.pipe(
    tap((req) => console.log(`${req.method} ${req.url}`))
  )
