import { r } from "@marblejs/core"
import { mapTo, tap } from "rxjs/operators"
import Store from "../../state/store"
import { InitGameAction } from "../../state/actions/game.action"
import { Payload } from "../../state/model/payload.model"

export const initGame$ = r.pipe(
  r.matchPath("/game/init"),
  r.matchType("GET"),
  r.useEffect((req$) =>
    req$.pipe(
      tap(() => {
        Store.dispatchAction(
          new InitGameAction(new Payload())
        )
      }),
      mapTo({ body: `Game initialized !` })
    )
  )
)
