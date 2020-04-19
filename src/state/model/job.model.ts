export interface Job {
  id: string
  title: string
  functionalDescription: string
  score: number
  penalty: number
  frequency: number
  difficulty: number
  technicalDescription?: string
  specs: string[]
  endpoint: string
  timeToReply: number
  timeToMarket: number
}
