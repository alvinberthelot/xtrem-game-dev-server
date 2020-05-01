import * as moment from "moment"
import * as chalk from "chalk"
import { sortBy, random } from "lodash"
import { State } from "./model/state.model"
import { initGame } from "./helpers/game.helper"
import { Action } from "./actions/action"
import {
  InitGameAction,
  StartGameAction,
  StopGameAction,
  PauseGameAction,
  RegisterGameAction,
  AddStepGameAction,
} from "./actions/game.action"
import { InitStateAction } from "./actions/state.action"
import { createTeam } from "./helpers/team.helper"
import { initCustomers } from "../seed/customers"
import { BehaviorSubject, of, timer, race } from "rxjs"
import {
  SECOND,
  DAY,
  createSmartTimer$,
  HOUR,
} from "../scheduler/metronome"
import {
  generateRandomString,
  getColor,
} from "./helpers/utils.helper"
import {
  tap,
  share,
  filter,
  map,
  switchMapTo,
} from "rxjs/operators"
import { getTeamStatus } from "../effects/status.effect"
import { Step, Score } from "./model/step.model"
import { PayloadId } from "./model/payload.model"

const GAME_ID_LENGTH = 7

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

        const id = generateRandomString(GAME_ID_LENGTH)
        const now = moment().valueOf()

        const game = initGame({
          id,
          date: now,
          customers,
          duration: 3 * HOUR,
          periodBetweenStep: 5 * SECOND,
        })

        const timerGameInitialized$$ = createSmartTimer$({
          timer$: timer(0, game.periodBetweenStep),
          toStart$: of(true),
          toStop$: race(
            game.isStopped$.pipe(filter((v) => v)),
            timer(2 * DAY)
          ),
        }).pipe(share())
        game.timerInit$$ = timerGameInitialized$$

        timerGameInitialized$$
          .pipe(
            map((step) => ({
              description: `Game ${chalk.magenta(
                id
              )} - Init`,
              step,
            })),
            tap(({ description, step }) => {
              console.log(description, step)
            })
          )
          .subscribe()

        const timerGameStarted$$ = createSmartTimer$({
          timer$: game.timerInit$$,
          toStart$: game.isStarted$.pipe(filter((v) => v)),
          toStop$: race(
            game.isStopped$.pipe(filter((v) => v))
          ),
        }).pipe(share())
        game.timerStart$$ = timerGameStarted$$

        timerGameStarted$$
          .pipe(
            map((step) => ({
              description: `Game ${chalk.magenta(
                id
              )} - Start`,
              step,
            })),
            tap(({ description, step }) => {
              console.log(description, step, `Add a step`)
              const payload = new PayloadId({ id })
              Store.dispatchAction(
                new AddStepGameAction(payload)
              )
            })
          )
          .subscribe()

        // game
        state.games[game.id] = game
        // logs
        state.logs[game.id] = [action]
        break
      }
      case StartGameAction: {
        const { date, id } = (<StartGameAction>(
          action
        )).payload
        // game
        const game = state.games[id]
        game.dateLastChange = date
        game.isStarted$.next(true)
        game.isStarted = true
        game.dateStart = date
        //
        game.isStarted$
          .pipe(switchMapTo(timer(game.duration)))
          .subscribe(() => {
            game.isStopped$.next(true)
          })
        // logs
        state.logs[id].push(action)
        break
      }
      case StopGameAction: {
        const { date, id } = (<StopGameAction>(
          action
        )).payload
        // game
        const game = state.games[id]
        game.dateLastChange = date
        game.isStopped$.next(true)
        game.isStopped = true
        game.dateStop = date
        // logs
        state.logs[id].push(action)
        break
      }
      case PauseGameAction: {
        const { date, id } = (<PauseGameAction>(
          action
        )).payload
        // game
        const game = state.games[id]
        game.dateLastChange = date
        game.isPaused = !game.isPaused
        game.datePause = date
        // logs
        state.logs[id].push(action)
        break
      }
      case RegisterGameAction: {
        const { payload } = <RegisterGameAction>action
        const { date, gameId } = payload
        const game = state.games[gameId]
        const color = getColor(
          Object.values(game.teams).length
        )
        const team = createTeam({ ...payload, color })
        game.dateLastChange = date
        game.teams[team.id] = team
        // logs
        state.logs[team.gameId].push(action)

        const timerTeamRegistered$ = createSmartTimer$({
          timer$: game.timerStart$$,
          toStart$: game.isStarted$.pipe(filter((v) => v)),
          toStop$: game.isStopped$.pipe(filter((v) => v)),
        })

        timerTeamRegistered$
          .pipe(
            tap(() => {
              try {
                getTeamStatus(game, team)
              } catch (error) {
                console.log("ERROR", error)
              }
            }),
            map((step) => ({
              description: `Game ${chalk.magenta(
                game.id
              )} - Team ${chalk.blue(team.id)} - Register`,
              step,
            })),
            tap(({ description, step }) => {
              console.log(description, step)
            })
          )
          .subscribe()
        break
      }
      case AddStepGameAction: {
        const { payload } = <AddStepGameAction>action
        const { date, id } = payload
        // game
        const game = state.games[id]
        const teams = game.teams
        const scores = Object.keys(teams).map((id) => ({
          teamId: id,
          score: random(100),
        }))
        const scoresSorted: Score[] = sortBy(
          scores,
          (v) => v.score
        )
          .reverse()
          .map((v, index) => ({ ...v, rank: index + 1 }))
        const step: Step = {
          id: generateRandomString(10),
          date,
          index: game.steps.length + 1,
          scores: scoresSorted,
        }
        game.steps.push(step)
        break
      }
      default: {
        console.warn("Action not found !")
      }
    }
    Store.getState$().next(state)
  }
}
