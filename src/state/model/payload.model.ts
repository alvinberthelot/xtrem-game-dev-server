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
  host: string
  gameId: string

  constructor(params: {
    name: string
    host: string
    gameId: string
  }) {
    super()
    this.name = params.name
    this.host = params.host
    this.gameId = params.gameId
  }
}
