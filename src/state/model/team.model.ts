import * as moment from "moment"

export interface Team {
  name: string
  id: string
  color: string
  origin: string
  gameId: string
  dateRegister: moment.Moment
}
