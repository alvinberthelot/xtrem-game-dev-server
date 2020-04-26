export function mapToGetParams(req: any): any {
  const params = {
    ...req.query,
    ...req.params,
    origin: req.headers.origin || "http://localhost:4200/",
  }
  return params
}
