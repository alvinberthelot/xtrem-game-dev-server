import { httpListener } from "@marblejs/core"
import { logger$ } from "./middleware/logger.middleware"
import { api$ } from "./api/api.effects"

const middlewares = [logger$]

const effects = [api$]

export const listener = httpListener({
  middlewares,
  effects,
})
