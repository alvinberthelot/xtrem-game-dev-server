import { Spec, QueryParam } from "state/model/spec.model"
import { Job, JobClient } from "state/model/job.model"

export function mapJobToJobClient(job: Job): JobClient {
  const jobClient: JobClient = {
    id: job.id,
    title: job.title,
    functionalDescription: job.functionalDescription,
    score: job.score,
    penalty: job.penalty,
    helpDescription: job.helpDescription,
    specs: job.specs.map((spec) => {
      return generateSpecDoc({
        endpoint: job.endpoint,
        method: job.method,
        spec,
      })
    }),
    timeToReply: job.timeToReply,
    timeToMarket: job.timeToMarket,
  }
  return jobClient
}

export function generateSpecDoc(params: {
  endpoint: string
  method: string
  spec: Spec
}): string {
  const givenDoc = generateGivenDoc()
  const whenDoc = generateWhenDoc({
    endpoint: params.endpoint,
    method: params.method,
    queryParams: params.spec.queryParams,
  })
  const thenDoc = generateThenDoc(params.spec)
  return `
  ${givenDoc}
  ${whenDoc}
  ${thenDoc}
  `
}

export function generateGivenDoc(): string {
  return "GIVEN your web server"
}

export function generateWhenDoc(params: {
  endpoint: string
  method: string
  queryParams?: QueryParam[]
}): string {
  return `WHEN the endpoint /${
    params.endpoint
  } is requested by a ${params.method} method${
    params.queryParams && params.queryParams.length > 0
      ? ` with query parameter${
          params.queryParams.length > 1 ? "s" : ""
        } ${params.queryParams
          .map(
            (param, index) =>
              `${index > 0 ? ` ` : ``}'${param.name}=${
                param.value
              }'`
          )
          .join()
          .toString()}`
      : ""
  }`
}

export function generateThenDoc(spec: Spec): string {
  return `THEN you should respond '${spec.response.toString()}'`
}
