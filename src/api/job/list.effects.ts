import { r } from "@marblejs/core"
import { map } from "rxjs/operators"
import Store from "../../state/store"
import { mapToGetParams } from "../helpers/api.helper"
import { mapJobToJobClient } from "../../state/helpers/job.helper"

export const listJob$ = r.pipe(
  r.matchPath("/game/:gameId/job"),
  r.matchType("GET"),
  r.useEffect((req$) =>
    req$.pipe(
      map(mapToGetParams),
      map(({ gameId }) => {
        const game = Store.getState().games[gameId]
        const body = Object.values(game.customers).reduce(
          (acc, customer) => {
            const jobs = customer.jobs
              ? Object.values(customer.jobs).map(
                  mapJobToJobClient
                )
              : []
            return [...acc, ...jobs]
          },
          []
        )
        return { body }
      })
    )
  )
)
