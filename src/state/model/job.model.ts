import { Spec } from "./spec.model"

export interface Job {
  id: string
  title: string
  functionalDescription: string
  score: number
  penalty: number
  frequency: number
  difficulty: number
  helpDescription?: string
  endpoint: string
  method: string
  specs: Spec[]
  timeToReply: number
  timeToMarket: number
}

export interface JobClient {
  id: string
  title: string
  functionalDescription: string
  score: number
  penalty: number
  helpDescription?: string
  specs: string[]
  timeToReply: number
  timeToMarket: number
}
