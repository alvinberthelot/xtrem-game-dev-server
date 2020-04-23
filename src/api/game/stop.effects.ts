import { r } from "@marblejs/core"
import { mapTo, tap, map } from "rxjs/operators"
import Store from "../../state/store"
import { FinishGameAction } from "../../state/actions/game.action"
import { PayloadId } from "../../state/model/payload.model"

export const stopGame$ = r.pipe(
  r.matchPath("/game/finish"),
  r.matchType("GET"),
  r.useEffect((req$) =>
    req$.pipe(
      map((req) => req.params),
      map((params: any) => new PayloadId(params)),
      tap((payload) => {
        Store.changeState(new FinishGameAction(payload))
      }),
      mapTo({ body: `Game finished !` })
    )
  )
)
