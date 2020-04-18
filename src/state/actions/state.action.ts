import { Action } from "./action"
import { Payload } from "../model/payload.model"

export class InitStateAction implements Action {
  payload: Payload
  constructor(payload: Payload) {
    this.payload = payload
  }
}
