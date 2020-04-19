import { r } from "@marblejs/core"
import { tap, map } from "rxjs/operators"
import Store from "../../state/store"
import { RegisterGameAction } from "../../state/actions/game.action"
import { PayloadTeam } from "state/model/payload.model"

export const register$ = r.pipe(
  r.matchPath("/game/:gameId/register"),
  r.matchType("GET"),
  r.useEffect((req$) =>
    req$.pipe(
      map((req: any) => {
        return new PayloadTeam({
          host: req.headers.host,
          ...req.query,
          ...req.params,
        })
      }),
      tap((payload) => {
        Store.changeState(new RegisterGameAction(payload))
      }),
      map((params) => ({
        body: `Registration requested by ${params.host}.`,
      }))
    )
  )
)
