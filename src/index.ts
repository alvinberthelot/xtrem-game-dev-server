import { createServer } from "@marblejs/core"
import { IO } from "fp-ts/lib/IO"
import { listener } from "./http.listener"
import Store from "./state/store"
import { map, filter, scan } from "rxjs/operators"
import { InitStateAction } from "./state/actions/state.action"
import { InitGameAction } from "./state/actions/game.action"
import { Payload } from "./state/model/payload.model"
import { split } from "./state/helpers/function.helper"

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
Store.dispatchAction(new InitGameAction(new Payload()))

const logs$ = state$.pipe(map((state) => state.logs))

const gamesKV$ = state$.pipe(map((state) => state.games))

gamesKV$.subscribe((games) => {
  // console.log("games", games)
})

const gamesSplitted$ = gamesKV$.pipe(
  scan(
    (acc, games) => {
      const memory = {
        ...acc.gamesAddedKV,
        ...acc.gamesChangedKV,
        ...acc.gamesUnchangedKV,
      }

      const [gamesAlreadyKnown, gamesAdded] = split({
        values: Object.values(games),
        predicate: (game) => memory[game.id],
      })

      const gamesAddedKV = gamesAdded.reduce(
        (accAdded, game) => ({
          ...accAdded,
          [game.id]: game.dateLastChange,
        }),
        {}
      )

      const [gamesChanged, gamesUnchanged] = split({
        values: gamesAlreadyKnown,
        predicate: (game) =>
          game.dateLastChange > memory[game.id],
      })

      const gamesChangedKV = gamesChanged.reduce(
        (accAdded, game) => ({
          ...accAdded,
          [game.id]: game.dateLastChange,
        }),
        {}
      )
      const gamesUnchangedKV = gamesUnchanged.reduce(
        (accAdded, game) => ({
          ...accAdded,
          [game.id]: game.dateLastChange,
        }),
        {}
      )

      return {
        gamesAddedKV,
        gamesChangedKV,
        gamesUnchangedKV,
      }
    },
    {
      gamesAddedKV: {},
      gamesChangedKV: {},
      gamesUnchangedKV: {},
    }
  )
)

const gamesAddedKV$ = gamesSplitted$.pipe(
  map((gamesSplitted) => gamesSplitted.gamesAddedKV),
  filter((gamesKV) => Object.values(gamesKV).length > 0)
)
const gamesChangedKV$ = gamesSplitted$.pipe(
  map((gamesSplitted) => gamesSplitted.gamesChangedKV),
  filter((gamesKV) => Object.values(gamesKV).length > 0)
)

gamesAddedKV$.subscribe((data) => {
  console.log("gamesAddedKV$", data)
})

gamesChangedKV$.subscribe((data) => {
  console.log("gamesChangedKV$", data)
})
