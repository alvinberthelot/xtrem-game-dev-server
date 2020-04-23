import {
  generateGivenDoc,
  generateWhenDoc,
  generateThenDoc,
} from "./job.helper"
import { Spec, QueryParam } from "../model/spec.model"

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
  describe("WHEN called with parameter queryParams is not defined", () => {
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
  describe("WHEN called with parameter queryParams as null", () => {
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
      const queryParams: QueryParam[] = [
        {
          name: "number1",
          value: "23",
        },
      ]
      const input = {
        endpoint: "place",
        method: "GET",
        queryParams,
      }
      const output = generateWhenDoc(input)
      const expected =
        "WHEN the endpoint /place is requested by a GET method with query parameter 'number1=23'"
      expect(output).toBe(expected)
    })
  })
  describe("WHEN called  with parameter queryParams is defined with 2 values", () => {
    test("THEN should return output with queryParams", () => {
      const queryParams: QueryParam[] = [
        {
          name: "number1",
          value: "6",
        },
        {
          name: "number2",
          value: "9",
        },
      ]
      const input = {
        endpoint: "place",
        method: "GET",
        queryParams,
      }
      const output = generateWhenDoc(input)
      const expected =
        "WHEN the endpoint /place is requested by a GET method with query parameters 'number1=6', 'number2=9'"
      expect(output).toBe(expected)
    })
  })
})

describe("GIVEN function generateThenDoc", () => {
  describe("WHEN called  with parameter response is defined as string", () => {
    test("THEN should return output with string", () => {
      const input: Spec = {
        response: "hello",
      }
      const output = generateThenDoc(input)
      const expected = "THEN you should respond 'hello'"
      expect(output).toBe(expected)
    })
  })
})
