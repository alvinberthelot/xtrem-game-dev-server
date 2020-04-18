import { httpListener } from "@marblejs/core"
import { logger$ } from "./middleware/logger.middleware"
import { init$ } from "./api/game/init.effects"
import { start$ } from "./api/game/start.effects"
import { stop$ } from "./api/game/stop.effects"
import { pause$ } from "./api/game/pause.effects"
import { list$ } from "./api/game/list.effects"

const middlewares = [logger$]

const effects = [init$, start$, stop$, pause$, list$]

export const listener = httpListener({
  middlewares,
  effects,
})
