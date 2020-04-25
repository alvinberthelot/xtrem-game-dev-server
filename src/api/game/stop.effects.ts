import { r } from "@marblejs/core"
import { mapTo, tap, map } from "rxjs/operators"
import Store from "../../state/store"
import { StopGameAction } from "../../state/actions/game.action"
import { PayloadId } from "../../state/model/payload.model"

export const stopGame$ = r.pipe(
  r.matchPath("/game/:id/stop"),
  r.matchType("GET"),
  r.useEffect((req$) =>
    req$.pipe(
      map((req) => req.params),
      map((params: any) => new PayloadId(params)),
      tap((payload) => {
        Store.dispatchAction(new StopGameAction(payload))
      }),
      mapTo({ body: `Game finished !` })
    )
  )
)
