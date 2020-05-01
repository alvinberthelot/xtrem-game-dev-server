import { r, HttpError, HttpStatus } from "@marblejs/core"
import { map } from "rxjs/operators"
import Store from "../../state/store"
import { mapToGetParams } from "../helpers/api.helper"
import { Game } from "../../state/model/game.model"
import { Team } from "../../state/model/team.model"

export const meAssociatedToGame$ = r.pipe(
  r.matchPath("/game/:gameId/me"),
  r.matchType("GET"),
  r.useEffect((req$) =>
    req$.pipe(
      map(mapToGetParams),
      map(({ gameId, origin }) => {
        const game: Game = Store.getState().games[gameId]
        if (!game) {
          throw new HttpError(
            `Game ${gameId} does not exist`,
            HttpStatus.NOT_FOUND
          )
        }
        let team: Team = null
        const teamsWithSameOrigin = Object.values(
          game.teams
        ).filter((team) => team.origin === origin)
        if (teamsWithSameOrigin.length > 0) {
          team = teamsWithSameOrigin[0]
        }
        return team
      }),
      map((team) => ({
        body: { team },
      }))
    )
  )
)
