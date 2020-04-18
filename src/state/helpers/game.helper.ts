import { Game } from "../model/game.model"
import { generateRandomString } from "./utils.helper"

const GAME_ID_LENGTH = 7

export function createGame(): Game {
  return {
    id: generateRandomString(GAME_ID_LENGTH),
    isStarted: false,
    dateStart: null,
    isPaused: false,
    isFinished: false,
    dateFinish: null,
  }
}
