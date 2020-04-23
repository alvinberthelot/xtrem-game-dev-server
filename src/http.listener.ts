import { httpListener } from "@marblejs/core"
import { cors$ } from "@marblejs/middleware-cors"
import { logger$ } from "./middleware/logger.middleware"
import { initGame$ } from "./api/game/init.effects"
import { startGame$ } from "./api/game/start.effects"
import { stopGame$ } from "./api/game/stop.effects"
import { pauseGame$ } from "./api/game/pause.effects"
import { listGame$ } from "./api/game/list.effects"
import { singleGame$ } from "./api/game/single.effects"
import { registerGame$ } from "./api/game/register.effects"
import { listCustomer$ } from "./api/customer/list.effects"
import { listJob$ } from "./api/job/list.effects"

const middlewares = [
  logger$,
  cors$({
    origin: "*",
    methods: ["GET", "OPTIONS"],
    optionsSuccessStatus: 200,
    allowHeaders: "*",
    maxAge: 3600,
  }),
]

const gameEffects = [
  initGame$,
  startGame$,
  stopGame$,
  pauseGame$,
  listGame$,
  singleGame$,
  registerGame$,
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
