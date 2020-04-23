import { Customer } from "../../state/model/customer.model"
import { hello } from "./hello"
import { lambda } from "./lambda"
import { mrfox } from "./mrfox"
import { spaceinvadersandco } from "./spaceinvadersandco"

export function initCustomers(): Customer[] {
  return [hello(), lambda(), mrfox(), spaceinvadersandco()]
}
