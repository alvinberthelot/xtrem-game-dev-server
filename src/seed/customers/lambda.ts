import { Customer } from "../../state/model/customer.model"

export function lambda(): Customer {
  const customer: Customer = {
    id: "YLtwGHQ4cTgPHzzMnbenZLhJ",
    name: "Lambda",
    emoticon: "🤓",
    jobs: {
      YxPKYQ3hRasqwFUeEjdZZCex: {
        id: "YxPKYQ3hRasqwFUeEjdZZCex",
        title: "Addition",
        functionalDescription:
          "I send you numbers (maximum 3) and your server should return the sum.",
        score: 3,
        penalty: 8,
        frequency: 20,
        difficulty: 1,
        helpDescription: null,
        endpoint: "addition",
        method: "GET",
        specs: [
          {
            response: "0",
          },
          {
            queryParams: [
              {
                name: "number1",
                value: "23",
              },
            ],
            response: "23",
          },
          {
            queryParams: [
              {
                name: "number1",
                value: "6",
              },
              {
                name: "number2",
                value: "9",
              },
            ],
            response: "15",
          },
          {
            queryParams: [
              {
                name: "number1",
                value: "5",
              },
              {
                name: "number2",
                value: "7",
              },
              {
                name: "number3",
                value: "9",
              },
            ],
            response: "21",
          },
        ],
        timeToReply: 60,
        timeToMarket: 600,
      },
    },
  }
  return customer
}
