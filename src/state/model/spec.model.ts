export interface QueryParam {
  name: string
  value: string
}

export interface Spec {
  response: string | object
  queryParams?: QueryParam[]
}
