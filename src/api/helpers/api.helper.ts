export function mapToGetParams(req: any): any {
  const params = {
    ...req.query,
    ...req.params,
  }
  return params
}
