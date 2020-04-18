import { createServer } from "@marblejs/core"
import { IO } from "fp-ts/lib/IO"
import { listener } from "./http.listener"
import { scheduler } from "./scheduler/scheduler"
import Store from "./state/store"
import { of, combineLatest } from "rxjs"
import { filter } from "rxjs/operators"

const server = createServer({
  port: 1337,
  hostname: "127.0.0.1",
  listener,
})

const apiServer: IO<void> = async () =>
  await (await server)()

apiServer()

const state$ = of(Store.getState())
const scheduler$ = scheduler()

combineLatest([state$, scheduler$])
  .pipe(
    filter(([state, scheduler]) => state.game.isStarted),
    filter(([state, scheduler]) => !state.game.isPaused),
    filter(([state, scheduler]) => !state.game.isFinished)
  )
  .subscribe(
    (data) => {
      console.log("DATA", data)
    },
    (error) => {
      console.log("ERROR", error)
    },
    () => {
      console.log("COMPLETE")
    }
  )
