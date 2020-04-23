import { r } from "@marblejs/core"
import { map } from "rxjs/operators"
import Store from "../../state/store"
import { mapToGetParams } from "../helpers/api.helper"

export const singleGame$ = r.pipe(
  r.matchPath("/game/:gameId"),
  r.matchType("GET"),
  r.useEffect((req$) =>
    req$.pipe(
      map(mapToGetParams),
      map(({ gameId }) => {
        const body = Store.getState().games[gameId]
        return { body }
      })
    )
  )
)
