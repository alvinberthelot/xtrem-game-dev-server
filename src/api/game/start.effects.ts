import { r } from "@marblejs/core"
import { mapTo, tap, map } from "rxjs/operators"
import Store from "../../state/store"
import { StartGameAction } from "../../state/actions/game.action"

export const start$ = r.pipe(
  r.matchPath("/game/:id/start"),
  r.matchType("GET"),
  r.useEffect((req$) =>
    req$.pipe(
      map((req) => req.params),
      tap((params: any) => {
        Store.changeState(new StartGameAction(params))
      }),
      mapTo({ body: `Game started !` })
    )
  )
)
