import * as moment from "moment"
import { Game } from "../model/game.model"
import { generateRandomString } from "./utils.helper"
import { Customer } from "state/model/customer.model"

const GAME_ID_LENGTH = 7

export function createGame(
  customers: Customer[],
  duration: number,
  frequency: number
): Game {
  const game: Game = {
    id: generateRandomString(GAME_ID_LENGTH),
    dateInit: moment().valueOf(),
    duration,
    frequency,
    numSteps: Math.round(duration / frequency) + 1,
    isStarted: false,
    dateStart: null,
    isPaused: false,
    datePause: null,
    isStopped: false,
    dateStop: null,
    teams: {},
    customers: customers.reduce((acc, customer) => {
      acc[customer.id] = customer
      return acc
    }, {}),
  }
  return game
}
