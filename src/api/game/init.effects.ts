import { r } from "@marblejs/core"
import { mapTo, tap } from "rxjs/operators"
import Store from "../../state/store"
import { InitGameAction } from "../../state/actions/game.action"

export const init$ = r.pipe(
  r.matchPath("/game/init"),
  r.matchType("GET"),
  r.useEffect((req$) =>
    req$.pipe(
      tap(() => {
        Store.changeState(new InitGameAction())
      }),
      mapTo({ body: `Game initialized !` })
    )
  )
)
