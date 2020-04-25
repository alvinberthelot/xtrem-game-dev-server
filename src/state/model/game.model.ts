import { Team } from "./team.model"
import { Customer } from "./customer.model"

export interface Game {
  id: string
  dateInit: number
  duration: number
  frequency: number
  numSteps: number
  isStarted: boolean
  dateStart: number
  isPaused: boolean
  datePause: number
  isStopped: boolean
  dateStop: number
  teams: {
    [id: string]: Team
  }
  customers: {
    [id: string]: Customer
  }
}
