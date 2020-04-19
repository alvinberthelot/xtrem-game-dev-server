import { Game } from "../model/game.model"
import { generateRandomString } from "./utils.helper"
import { Customer } from "state/model/customer.model"

const GAME_ID_LENGTH = 7

export function createGame(customers: Customer[]): Game {
  const game: Game = {
    id: generateRandomString(GAME_ID_LENGTH),
    isStarted: false,
    dateStart: null,
    isPaused: false,
    isFinished: false,
    dateFinish: null,
    teams: {},
    customers: customers.reduce((acc, customer) => {
      acc[customer.id] = customer
      return acc
    }, {}),
  }
  return game
}
