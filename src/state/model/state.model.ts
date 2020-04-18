import * as moment from "moment"
import { Game } from "./game.model"
import { Action } from "../actions/action"

export interface State {
  dateInit: moment.Moment
  log: Action[]
  games: {
    [id: string]: Game
  }
}
