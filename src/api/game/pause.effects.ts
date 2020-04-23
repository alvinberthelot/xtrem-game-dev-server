import { r } from "@marblejs/core"
import { mapTo, tap, map } from "rxjs/operators"
import Store from "../../state/store"
import { PauseGameAction } from "../../state/actions/game.action"
import { PayloadId } from "../../state/model/payload.model"

export const pauseGame$ = r.pipe(
  r.matchPath("/game/pause"),
  r.matchType("GET"),
  r.useEffect((req$) =>
    req$.pipe(
      map((req) => req.params),
      map((params: any) => new PayloadId(params)),
      tap((payload) => {
        Store.changeState(new PauseGameAction(payload))
      }),
      mapTo({ body: `Game paused !` })
    )
  )
)
