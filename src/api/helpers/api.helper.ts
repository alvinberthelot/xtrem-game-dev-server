export function mapToGetParams(req: any): any {
  const params = {
    ...req.query,
    ...req.params,
    origin: req.headers.origin || "http://localhost:8080/",
  }
  return params
}
