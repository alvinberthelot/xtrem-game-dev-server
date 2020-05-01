export function generateRandomString(int: number): string {
  return Math.random()
    .toString(36)
    .replace(/[^A-Za-z0-9]+/g, "")
    .substr(0, int)
}

export function getColor(index: number): string {
  const blue = "#4299e1"
  const gray = "#a0aec0"
  const green = "#48bb78"
  const indigo = "#667eea"
  const orange = "#ed8936"
  const pink = "#ed64a6"
  const purple = "#9f7aea"
  const red = "#f56565"
  const teal = "#38b2ac"
  // const yellow = "#ecc94b"
  const colors = [
    blue,
    green,
    red,
    teal,
    purple,
    pink,
    indigo,
    gray,
    orange,
  ]
  return colors[index % colors.length]
}
