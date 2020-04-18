import { httpListener } from "@marblejs/core"
import { logger$ } from "./middleware/logger.middleware"
import { start$ } from "./api/game/start.effects"
import { stop$ } from "./api/game/stop.effects"
import { pause$ } from "./api/game/pause.effects"

const middlewares = [logger$]

const effects = [start$, stop$, pause$]

export const listener = httpListener({
  middlewares,
  effects,
})
