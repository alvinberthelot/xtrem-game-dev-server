import { Action, TypeAction } from "./action"

export class StartGameAction extends Action {
  constructor() {
    super(TypeAction.StartGame)
  }
}

export class FinishGameAction extends Action {
  constructor() {
    super(TypeAction.FinishGame)
  }
}

export class PauseGameAction extends Action {
  constructor() {
    super(TypeAction.PauseGame)
  }
}
