import { r } from "@marblejs/core"
import { map, flatMap, mapTo, tap } from "rxjs/operators"
import {
  RxHR,
  RxHttpRequestResponse,
} from "@akanass/rx-http-request"

import Store from "../state/store"

export const api$ = r.pipe(
  r.matchPath("/game/start"),
  r.matchType("GET"),
  r.useEffect((req$) =>
    req$.pipe(
      tap(() => {
        Store.changeState()
      }),
      mapTo({ body: `Game started !` })
    )
  )
)

// export const api$ = r.pipe(
//   r.matchPath("/"),
//   r.matchType("GET"),
//   r.useEffect((req$) => {
//     return req$.pipe(
//       flatMap((v) =>
//         RxHR.get(
//           `https://api.chucknorris.io/jokes/random`,
//           {
//             json: true,
//           }
//         )
//       ),
//       map((data: RxHttpRequestResponse) => data.body.value),
//       map((v) => ({ body: `Chuck says : ${v}` }))
//     )
//   })
// )
