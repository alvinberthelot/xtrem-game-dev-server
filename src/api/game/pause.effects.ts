import { r } from "@marblejs/core"
import { mapTo, tap, map } from "rxjs/operators"
import Store from "../../state/store"
import { PauseGameAction } from "../../state/actions/game.action"

export const pause$ = r.pipe(
  r.matchPath("/game/pause"),
  r.matchType("GET"),
  r.useEffect((req$) =>
    req$.pipe(
      map((req) => req.params),
      tap((params: any) => {
        Store.changeState(new PauseGameAction(params))
      }),
      mapTo({ body: `Game paused !` })
    )
  )
)
