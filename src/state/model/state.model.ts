import { Game } from "./game.model"
import { Action } from "../actions/action"

export interface State {
  dateInit: number
  logs: {
    [id: string]: Action[]
  }
  games: {
    [id: string]: Game
  }
}
