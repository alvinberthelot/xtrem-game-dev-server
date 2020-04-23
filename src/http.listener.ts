import { httpListener } from "@marblejs/core"
import { logger$ } from "./middleware/logger.middleware"
import { init$ } from "./api/game/init.effects"
import { start$ } from "./api/game/start.effects"
import { stop$ } from "./api/game/stop.effects"
import { pause$ } from "./api/game/pause.effects"
import { list$ } from "./api/game/list.effects"
import { register$ } from "./api/game/register.effects"
import { listCustomer$ } from "api/customer/list.effects"
import { listJob$ } from "api/job/list.effects"

const middlewares = [logger$]

const gameEffects = [
  init$,
  start$,
  stop$,
  pause$,
  list$,
  register$,
]
const customerEffects = [listCustomer$]
const jobEffects = [listJob$]

const effects = [
  ...gameEffects,
  ...customerEffects,
  ...jobEffects,
]

export const listener = httpListener({
  middlewares,
  effects,
})
