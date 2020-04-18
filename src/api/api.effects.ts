import { r } from "@marblejs/core"
import { map, flatMap } from "rxjs/operators"
import {
  RxHR,
  RxHttpRequestResponse,
} from "@akanass/rx-http-request"

export const api$ = r.pipe(
  r.matchPath("/"),
  r.matchType("GET"),
  r.useEffect((req$) => {
    return req$.pipe(
      flatMap((v) =>
        RxHR.get(
          `https://api.chucknorris.io/jokes/random`,
          {
            json: true,
          }
        )
      ),
      map((data: RxHttpRequestResponse) => data.body.value),
      map((v) => ({ body: `Chuck says : ${v}` }))
    )
  })
)
