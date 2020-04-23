import { r } from "@marblejs/core"
import { map } from "rxjs/operators"
import Store from "../../state/store"

export const listGame$ = r.pipe(
  r.matchPath("/game"),
  r.matchType("GET"),
  r.useEffect((req$) =>
    req$.pipe(
      map(() => {
        const games = Object.values(Store.getState().games)
        const body = games.map((game) => game.id)
        return { body }
      })
    )
  )
)
