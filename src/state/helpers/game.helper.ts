import { Game, GameClient } from "../model/game.model"
import { Customer } from "state/model/customer.model"
import { BehaviorSubject } from "rxjs"

export function initGame(params: {
  id: string
  date: number
  customers: Customer[]
  duration: number
  periodBetweenStep: number
}): Game {
  const numSteps =
    Math.round(params.duration / params.periodBetweenStep) +
    1
  const game: Game = {
    id: params.id,
    dateLastChange: params.date,
    dateInit: params.date,
    duration: params.duration,
    periodBetweenStep: params.periodBetweenStep,
    numSteps,
    isStarted: false,
    dateStart: null,
    isPaused: false,
    datePause: null,
    isStopped: false,
    dateStop: null,
    teams: {},
    customers: params.customers.reduce((acc, customer) => {
      acc[customer.id] = customer
      return acc
    }, {}),
    gameInitialized$: null,
    timerInit$$: null,
    timerStart$$: null,
    isStarted$: new BehaviorSubject(false),
    isPaused$: new BehaviorSubject(false),
    isStopped$: new BehaviorSubject(false),
  }
  return game
}

export function mapGameClient(game: Game): GameClient {
  const gameClient: GameClient = {
    id: game.id,
    duration: game.duration,
    isStarted: game.isStarted,
    isPaused: game.isPaused,
    isStopped: game.isStopped,
    teams: game.teams,
  }
  return gameClient
}
