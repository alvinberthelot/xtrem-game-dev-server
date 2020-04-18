import * as moment from "moment"

export class Payload {
  date: moment.Moment
  constructor() {
    this.date = moment()
  }
}

export class PayloadId extends Payload {
  id: string
  constructor(id: string) {
    super()
    this.id = id
  }
}
