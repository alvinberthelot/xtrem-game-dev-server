import { createServer } from "@marblejs/core"
import { IO } from "fp-ts/lib/IO"
import { listener } from "./http.listener"
import Store from "./state/store"
import { tap, map } from "rxjs/operators"
import { InitStateAction } from "./state/actions/state.action"
import { Payload } from "./state/model/payload.model"
import { metronome$ } from "scheduler/metronome"

const server = createServer({
  port: 8080,
  hostname: "0.0.0.0",
  listener,
})

const apiServer: IO<void> = async () =>
  await (await server)()
apiServer()

const state$ = Store.getState$()
Store.dispatchAction(new InitStateAction(new Payload()))

const logs$ = state$.pipe(map((state) => state.logs))
const games$ = state$.pipe(
  map((state) => Object.values(state.games))
)

// state$.subscribe((data) => {
//   console.log("state", data)
// })
// logs$.subscribe((data) => {
//   console.log("logs", data)
// })

const metronomeGameSubscription = {}

games$
  .pipe(
    tap((games) => {
      games.forEach((game) => {
        // console.log(game.id)
        if (metronomeGameSubscription[game.id]) {
          if (game.isStopped) {
            metronomeGameSubscription[game.id].unsubscribe()
          }
          // if
        } else {
          metronomeGameSubscription[game.id] = metronome$(
            game.id,
            game.frequency,
            game.numSteps
          ).subscribe((data) => {
            console.log("metronome", data.name, data.step)
          })
        }
      })
    })
  )
  .subscribe()
