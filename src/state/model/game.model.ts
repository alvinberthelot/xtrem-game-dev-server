import * as moment from "moment"
import { Team } from "./team.model"

export interface Game {
  id: string
  isStarted: boolean
  dateStart: moment.Moment
  isPaused: boolean
  isFinished: boolean
  dateFinish: moment.Moment
  teams: {
    [id: string]: Team
  }
}
