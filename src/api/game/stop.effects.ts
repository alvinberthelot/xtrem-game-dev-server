import { r } from "@marblejs/core"
import { mapTo, tap, map } from "rxjs/operators"
import Store from "../../state/store"
import { FinishGameAction } from "../../state/actions/game.action"

export const stop$ = r.pipe(
  r.matchPath("/game/finish"),
  r.matchType("GET"),
  r.useEffect((req$) =>
    req$.pipe(
      map((req) => req.params),
      tap((params: any) => {
        Store.changeState(new FinishGameAction(params))
      }),
      mapTo({ body: `Game finished !` })
    )
  )
)
