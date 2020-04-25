import { State } from "./model/state.model"
import { createGame } from "./helpers/game.helper"
import { Action } from "./actions/action"
import {
  InitGameAction,
  StartGameAction,
  StopGameAction,
  PauseGameAction,
  RegisterGameAction,
} from "./actions/game.action"
import { InitStateAction } from "./actions/state.action"
import { createTeam } from "./helpers/team.helper"
import { initCustomers } from "../seed/customers"
import { BehaviorSubject } from "rxjs"
import {
  DURATION_10S,
  DURATION_5S,
} from "scheduler/metronome"

export default class Store {
  private static instance$: BehaviorSubject<State>

  static getState$(): BehaviorSubject<State> {
    if (!Store.instance$) {
      Store.instance$ = new BehaviorSubject({
        dateInit: null,
        logs: {},
        games: {},
      })
    }
    return Store.instance$
  }
  static getState(): State {
    return Store.getState$().getValue()
  }

  static dispatchAction(action: Action) {
    const state = Store.getState()
    let newState: State

    switch (action.constructor) {
      case InitStateAction: {
        const { date } = (<InitStateAction>action).payload
        newState = {
          dateInit: date,
          logs: {},
          games: {},
        }
        break
      }
      case InitGameAction: {
        const customers = initCustomers()
        const game = createGame(
          customers,
          DURATION_10S,
          DURATION_5S
        )
        newState = {
          ...state,
          games: { ...state.games, [game.id]: game },
          logs: { ...state.logs, [game.id]: [action] },
        }
        break
      }
      case StartGameAction: {
        const { date, id } = (<StartGameAction>(
          action
        )).payload
        const game = state.games[id]
        const logs = state.logs[id]
        newState = {
          ...state,
          games: {
            ...state.games,
            [id]: {
              ...game,
              isStarted: true,
              dateStart: date,
            },
          },
          logs: { ...state.logs, [id]: [...logs, action] },
        }
        break
      }
      case StopGameAction: {
        const { date, id } = (<StopGameAction>(
          action
        )).payload
        const game = state.games[id]
        const logs = state.logs[id]
        newState = {
          ...state,
          games: {
            ...state.games,
            [id]: {
              ...game,
              isStopped: true,
              dateStop: date,
            },
          },
          logs: { ...state.logs, [id]: [...logs, action] },
        }
        break
      }
      case PauseGameAction: {
        const { date, id } = (<PauseGameAction>(
          action
        )).payload
        const game = state.games[id]
        const logs = state.logs[id]
        newState = {
          ...state,
          games: {
            ...state.games,
            [id]: {
              ...game,
              isPaused: !game.isPaused,
              datePause: date,
            },
          },
          logs: { ...state.logs, [id]: [...logs, action] },
        }
        break
      }
      case RegisterGameAction: {
        const { payload } = <RegisterGameAction>action
        const team = createTeam(payload)
        const game = state.games[team.gameId]
        const logs = state.logs[team.gameId]
        newState = {
          ...state,
          games: {
            ...state.games,
            [game.id]: {
              ...game,
              teams: { ...game.teams, [team.id]: team },
            },
          },
          logs: {
            ...state.logs,
            [game.id]: [...logs, action],
          },
        }
        break
      }
      default: {
        console.warn("Action not found !")
      }
    }
    Store.getState$().next(newState)
  }
}
