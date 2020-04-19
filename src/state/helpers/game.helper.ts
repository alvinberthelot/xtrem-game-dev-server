import { Game } from "../model/game.model"
import { generateRandomString } from "./utils.helper"

const GAME_ID_LENGTH = 7

export function createGame(): Game {
  const game: Game = {
    id: generateRandomString(GAME_ID_LENGTH),
    isStarted: false,
    dateStart: null,
    isPaused: false,
    isFinished: false,
    dateFinish: null,
    teams: {},
  }
  return game
}
