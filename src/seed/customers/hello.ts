import { Customer } from "../../state/model/customer.model"

export function hello(): Customer {
  const customer: Customer = {
    id: "JjCW2BbXYDEqpFPAUYxcawNc",
    name: "Hello",
    emoticon: "👋",
    jobs: {
      XwpzfKDtPgirgigQWusi4HFx: {
        id: "XwpzfKDtPgirgigQWusi4HFx",
        title: "Say hello",
        functionalDescription:
          "I say hello so you should do the same.",
        score: 1,
        penalty: 0,
        frequency: 0,
        difficulty: 0,
        helpDescription: null,
        endpoint: "hello",
        method: "GET",
        specs: [
          {
            response: "Hello",
          },
        ],
        timeToReply: 0,
        timeToMarket: 0,
      },
    },
  }
  return customer
}
