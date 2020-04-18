export class Action {
  type: TypeAction
  payload?: object

  constructor(type, payload?) {
    this.type = type
    this.payload = payload
  }
}

export enum TypeAction {
  StartGame,
  FinishGame,
  PauseGame,
}
