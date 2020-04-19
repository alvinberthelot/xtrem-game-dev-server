import * as fs from "fs"
import { Customer } from "state/model/customer.model"

export function initCustomers(): Customer[] {
  const customersFolder = "seed/customers/"

  // init case, so this is ok for the sync way
  const customers = fs
    .readdirSync(`src/${customersFolder}`)
    .reduce((acc, file) => {
      // const data = await import(`${customersFolder}${file}`)
      const data = require(`${customersFolder}${file}`)
      return [...acc, data]
    }, [])

  return customers
}
