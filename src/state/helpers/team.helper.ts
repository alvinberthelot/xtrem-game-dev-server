import { generateRandomString } from "./utils.helper"
import { Team } from "../model/team.model"

const GAME_ID_TEAM = 7

export function createTeam(params: {
  name: string
  color: string
  origin: string
  gameId: string
  date: number
}): Team {
  return {
    id: generateRandomString(GAME_ID_TEAM),
    name: params.name,
    color: params.color,
    origin: params.origin,
    gameId: params.gameId,
    dateRegister: params.date,
  }
}
