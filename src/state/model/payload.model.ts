import * as moment from "moment"

export class Payload {
  date: moment.Moment
  constructor() {
    this.date = moment()
  }
}

export class PayloadId extends Payload {
  id: string
  constructor(params: { id: string }) {
    super()
    this.id = params.id
  }
}

export class PayloadTeam extends Payload {
  name: string
  origin: string
  gameId: string

  constructor(params: {
    name: string
    origin: string
    gameId: string
  }) {
    super()
    this.name = params.name
    this.origin = params.origin
    this.gameId = params.gameId
  }
}
