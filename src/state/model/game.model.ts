import * as moment from "moment"

export interface Game {
  id: string
  isStarted: boolean
  dateStart: moment.Moment
  isPaused: boolean
  isFinished: boolean
  dateFinish: moment.Moment
}
