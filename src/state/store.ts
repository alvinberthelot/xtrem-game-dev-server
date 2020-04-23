import { State } from "./model/state.model"
import { createGame } from "./helpers/game.helper"
import { Action } from "./actions/action"
import {
  InitGameAction,
  StartGameAction,
  FinishGameAction,
  PauseGameAction,
  RegisterGameAction,
} from "./actions/game.action"
import { InitStateAction } from "./actions/state.action"
import { createTeam } from "./helpers/team.helper"
import { initCustomers } from "../seed/customers"

export default class Store {
  private static instance: State

  static getState() {
    if (!Store.instance) {
      // Store.instance = {}
    }

    return Store.instance
  }

  static changeState(action: Action) {
    const state = Store.getState()

    switch (action.constructor) {
      case InitStateAction: {
        const { date } = (<InitStateAction>action).payload
        Store.instance = {
          dateInit: date,
          log: [action],
          games: {},
        }
        break
      }
      case InitGameAction: {
        const customers = initCustomers()
        const game = createGame(customers)
        state.games[game.id] = game
        break
      }
      case StartGameAction: {
        const { id } = (<StartGameAction>action).payload
        const game = state.games[id]
        game.isStarted = true
        break
      }
      case FinishGameAction: {
        const { id } = (<FinishGameAction>action).payload
        const game = state.games[id]
        game.isFinished = true
        break
      }
      case PauseGameAction: {
        const { id } = (<PauseGameAction>action).payload
        const game = state.games[id]
        game.isPaused = !game.isPaused
        break
      }
      case RegisterGameAction: {
        const { payload } = <RegisterGameAction>action
        console.log("pay", payload)
        const team = createTeam(payload)
        const game = state.games[team.gameId]
        game.teams[team.id] = team
        break
      }
      default: {
        console.warn("Action not found !")
      }
    }
  }
}
