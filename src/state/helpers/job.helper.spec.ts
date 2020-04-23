import {
  generateGivenDoc,
  generateWhenDoc,
  generateThenDoc,
} from "./job.helper"

describe("GIVEN function generateGivenDoc", () => {
  describe("WHEN called without parameter", () => {
    test("THEN should return static output", () => {
      const output = generateGivenDoc()
      const expected = "GIVEN your web server"
      expect(output).toBe(expected)
    })
  })
})

describe("GIVEN function generateWhenDoc", () => {
  describe("WHEN called  with parameter queryParams is not defined", () => {
    test("THEN should return output without queryParams", () => {
      const input = {
        endpoint: "hello",
        method: "GET",
      }
      const output = generateWhenDoc(input)
      const expected =
        "WHEN the endpoint /hello is requested by a GET method"
      expect(output).toBe(expected)
    })
  })
  describe("WHEN called  with parameter queryParams is not defined", () => {
    test("THEN should return output without queryParams", () => {
      const input = {
        endpoint: "hello",
        method: "GET",
        queryParams: null,
      }
      const output = generateWhenDoc(input)
      const expected =
        "WHEN the endpoint /hello is requested by a GET method"
      expect(output).toBe(expected)
    })
  })
  describe("WHEN called  with parameter queryParams is defined with 1 value", () => {
    test("THEN should return output with queryParams", () => {
      const input = {
        endpoint: "place",
        method: "GET",
        queryParams: ["country"],
      }
      const output = generateWhenDoc(input)
      const expected =
        "WHEN the endpoint /place is requested by a GET method with query parameter 'country'"
      expect(output).toBe(expected)
    })
  })
  describe("WHEN called  with parameter queryParams is defined with 2 values", () => {
    test("THEN should return output with queryParams", () => {
      const input = {
        endpoint: "place",
        method: "GET",
        queryParams: ["country", "town"],
      }
      const output = generateWhenDoc(input)
      const expected =
        "WHEN the endpoint /place is requested by a GET method with query parameters 'country', 'town'"
      expect(output).toBe(expected)
    })
  })
})

describe("GIVEN function generateThenDoc", () => {
  describe("WHEN called  with parameter response is defined as string", () => {
    test("THEN should return output with string", () => {
      const input = {
        response: "hello",
      }
      const output = generateThenDoc(input)
      const expected = "THEN you should respond 'hello'"
      expect(output).toBe(expected)
    })
  })
})
