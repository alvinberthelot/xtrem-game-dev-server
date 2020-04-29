export interface Score {
  teamId: string
  score: number
  rank: number
}

export interface Step {
  id: string
  date: number
  index: number
  scores: Score[]
}
