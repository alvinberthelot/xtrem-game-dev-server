import { State } from "./model/state.model"
import { createGame } from "./helpers/game.helper"
import { Action, TypeAction } from "./actions/action"

export default class Store {
  private static instance: State

  static getState() {
    if (!Store.instance) {
      Store.instance = {
        game: createGame(),
      }
    }

    return Store.instance
  }

  static changeState(action: Action) {
    const state = Store.getState()

    switch (action.type) {
      case TypeAction.StartGame: {
        console.log("START")
        state.game.isStarted = true
        break
      }
      case TypeAction.FinishGame: {
        console.log("FINISH")
        state.game.isFinished = true
        break
      }
      case TypeAction.PauseGame: {
        console.log("PAUSE")
        state.game.isPaused = !state.game.isPaused
        break
      }
      default: {
        console.log("DEFAULT")
      }
    }
  }
}
