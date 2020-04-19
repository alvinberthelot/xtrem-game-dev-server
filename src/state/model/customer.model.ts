import { Job } from "./job.model"

export interface Customer {
  id: string
  name: string
  emoticon: string
  jobs: {
    [id: string]: Job
  }
}
