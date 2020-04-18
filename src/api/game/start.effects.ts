import { r } from "@marblejs/core"
import { mapTo, tap } from "rxjs/operators"
import Store from "../../state/store"
import { StartGameAction } from "../../state/actions/game.action"

export const start$ = r.pipe(
  r.matchPath("/game/start"),
  r.matchType("GET"),
  r.useEffect((req$) =>
    req$.pipe(
      tap(() => {
        Store.changeState(new StartGameAction())
      }),
      mapTo({ body: `Game started !` })
    )
  )
)
