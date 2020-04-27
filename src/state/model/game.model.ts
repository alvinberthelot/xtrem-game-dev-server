import { Team } from "./team.model"
import { Customer } from "./customer.model"
import { Observable, BehaviorSubject } from "rxjs"

export interface Game {
  id: string
  dateLastChange: number
  dateInit: number
  duration: number
  periodBetweenStep: number
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
  gameInitialized$: Observable<any>
  timerInit$$: Observable<number>
  timerStart$$: Observable<number>
  isStarted$: BehaviorSubject<boolean>
  isPaused$: BehaviorSubject<boolean>
  isStopped$: BehaviorSubject<boolean>
}

export interface GameClient {
  id: string
  duration: number
  isStarted: boolean
  isPaused: boolean
  isStopped: boolean
  teams: {
    [id: string]: Team
  }
}
