import * as chalk from "chalk"
import { RxHR } from "@akanass/rx-http-request"
import { Team } from "../state/model/team.model"
import { timer, race } from "rxjs"
import { SECOND } from "../scheduler/metronome"
import { Game } from "../state/model/game.model"

export function getTeamStatus(game: Game, team: Team) {
  const request = `${team.origin}status`
  race(timer(4 * SECOND), RxHR.get(request)).subscribe(
    (data: any) => {
      if (
        data.response &&
        data.response.statusCode === 200
      ) {
        console.log(`STATUS OK`, request)
      } else {
        console.log(`STATUS KO`, request)
      }
    },
    (err) => console.error(err)
  )
}
