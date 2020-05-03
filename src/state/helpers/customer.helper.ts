import {
  Customer,
  CustomerClient,
} from "state/model/customer.model"

export function mapCustomerToCustomerClient(
  customer: Customer
): CustomerClient {
  const customerClient: CustomerClient = {
    id: customer.id,
    name: customer.name,
    emoticon: customer.emoticon,
  }
  return customerClient
}
