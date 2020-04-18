export function generateRandomString(int: number): string {
  return Math.random()
    .toString(36)
    .replace(/[^A-Za-z0-9]+/g, "")
    .substr(0, int)
}
