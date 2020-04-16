import { httpListener } from "@marblejs/core"
import { api$ } from "./api.effects"

const middlewares = []

const effects = [api$]

export const listener = httpListener({
  middlewares,
  effects,
})
