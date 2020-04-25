import { r } from "@marblejs/core"
import { mapTo, tap, map } from "rxjs/operators"
import Store from "../../state/store"
import { StartGameAction } from "../../state/actions/game.action"
import { PayloadId } from "../../state/model/payload.model"

export const startGame$ = r.pipe(
  r.matchPath("/game/:id/start"),
  r.matchType("GET"),
  r.useEffect((req$) =>
    req$.pipe(
      map((req) => req.params),
      map((params: any) => new PayloadId(params)),
      tap((payload) => {
        Store.dispatchAction(new StartGameAction(payload))
      }),
      mapTo({ body: `Game started !` })
    )
  )
)
