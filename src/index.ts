import { createServer } from "@marblejs/core"
import { IO } from "fp-ts/lib/IO"
import { listener } from "./http.listener"
import { scheduler } from "./scheduler/scheduler"
import Store from "./state/store"
import { of, combineLatest } from "rxjs"
import { tap } from "rxjs/operators"
import { InitStateAction } from "./state/actions/state.action"
import { Payload } from "./state/model/payload.model"

const server = createServer({
  port: 8080,
  hostname: "0.0.0.0",
  listener,
})

const apiServer: IO<void> = async () =>
  await (await server)()

apiServer()

Store.changeState(new InitStateAction(new Payload()))

const state$ = of(Store.getState())
const scheduler$ = scheduler()

combineLatest([state$, scheduler$])
  .pipe(
    tap(([state, scheduler]) => {
      const games = Object.values(state.games)
      games
        .filter((game) => game.isStarted)
        .filter((game) => !game.isPaused)
        .filter((game) => !game.isFinished)
        .forEach((game) => {
          // console.log(`Game #${JSON.stringify(game)}`)
        })
    })
  )
  .subscribe(
    () => {
      // console.log(".")
    },
    (error) => {
      console.error("ERROR", error)
    },
    () => {
      console.log(`
        -_-_-_-_-_-_-_-_-_-_-_-_
        COMPLETE !
        -_-_-_-_-_-_-_-_-_-_-_-_
      `)
    }
  )
