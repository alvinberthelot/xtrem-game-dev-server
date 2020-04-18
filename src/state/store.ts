import { State } from "./model/state.model"
import { createGame } from "./helpers/game.helper"

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

  static changeState() {
    const state = Store.getState()
    if (!state?.game.isStarted) {
      state.game.isStarted = true
    } else {
      state.game.isStarted = false
    }
  }
}
