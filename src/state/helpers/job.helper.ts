import { Spec } from "state/model/spec.model"

export function generateDoc(
  endpoint: string,
  spec: Spec
): string {
  const givenDoc = generateGivenDoc()
  const whenDoc = generateWhenDoc({
    endpoint,
    method: spec.method,
    queryParams: spec.queryParams,
  })
  const thenDoc = generateThenDoc(spec.response)
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
  queryParams?: string[]
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
              `${index > 0 ? ` ` : ``}'${param}'`
          )
          .join()
          .toString()}`
      : ""
  }`
}

export function generateThenDoc(params: {
  response: string | object
}): string {
  return `THEN you should respond '${params.response.toString()}'`
}
