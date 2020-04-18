import { r } from "@marblejs/core"
import { mapTo, tap } from "rxjs/operators"
import Store from "../../state/store"
import { PauseGameAction } from "../../state/actions/game.action"

export const pause$ = r.pipe(
  r.matchPath("/game/pause"),
  r.matchType("GET"),
  r.useEffect((req$) =>
    req$.pipe(
      tap(() => {
        Store.changeState(new PauseGameAction())
      }),
      mapTo({ body: `Game paused !` })
    )
  )
)
