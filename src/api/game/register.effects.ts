import { r, HttpError, HttpStatus } from "@marblejs/core"
import { tap, map } from "rxjs/operators"
import Store from "../../state/store"
import { RegisterGameAction } from "../../state/actions/game.action"
import { PayloadTeam } from "../../state/model/payload.model"
import { mapToGetParams } from "../../api/helpers/api.helper"
import { Game } from "../../state/model/game.model"

export const registerGame$ = r.pipe(
  r.matchPath("/game/:gameId/register"),
  r.matchType("GET"),
  r.useEffect((req$) =>
    req$.pipe(
      map(mapToGetParams),
      tap(({ gameId, origin }) => {
        const game: Game = Store.getState().games[gameId]
        if (!game) {
          throw new HttpError(
            `Game ${gameId} does not exist`,
            HttpStatus.NOT_FOUND
          )
        }
        const teamsWithSameOrigin = Object.values(
          game.teams
        ).filter((team) => team.origin === origin)
        if (teamsWithSameOrigin.length === 0) {
          const payload = new PayloadTeam({
            name: origin,
            origin,
            gameId,
          })
          Store.changeState(new RegisterGameAction(payload))
        } else {
          throw new HttpError(
            `Client ${origin} already registered to the game ${gameId}`,
            HttpStatus.CONFLICT
          )
        }
        return origin
      }),
      map((origin) => ({
        body: `Registration requested by ${origin}.`,
      }))
    )
  )
)
