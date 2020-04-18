import { r } from "@marblejs/core"
import { mapTo, tap } from "rxjs/operators"
import Store from "../../state/store"
import { FinishGameAction } from "../../state/actions/game.action"

export const stop$ = r.pipe(
  r.matchPath("/game/finish"),
  r.matchType("GET"),
  r.useEffect((req$) =>
    req$.pipe(
      tap(() => {
        Store.changeState(new FinishGameAction())
      }),
      mapTo({ body: `Game finished !` })
    )
  )
)
