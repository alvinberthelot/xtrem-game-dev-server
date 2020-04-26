import { split } from "./function.helper"

fdescribe("GIVEN function split", () => {
  describe("WHEN called with values and predicate", () => {
    test("THEN should return split values", () => {
      const input = {
        values: [1, 2, 3, 5, 6],
        predicate: (v) => v % 2 === 0,
      }
      const output = split(input)
      const expected = [
        [2, 6],
        [1, 3, 5],
      ]
      expect(output).toEqual(expected)
    })
  })
})
