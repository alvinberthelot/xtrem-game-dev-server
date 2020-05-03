import { r } from "@marblejs/core"
import { map } from "rxjs/operators"
import Store from "../../state/store"
import { mapToGetParams } from "../helpers/api.helper"
import { mapCustomerToCustomerClient } from "../../state/helpers/customer.helper"

export const listCustomer$ = r.pipe(
  r.matchPath("/game/:gameId/customer"),
  r.matchType("GET"),
  r.useEffect((req$) =>
    req$.pipe(
      map(mapToGetParams),
      map(({ gameId }) => {
        const game = Store.getState().games[gameId]
        const body = Object.values(
          game.customers
        ).map((customer) =>
          mapCustomerToCustomerClient(customer)
        )
        return { body }
      })
    )
  )
)
