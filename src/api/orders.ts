import { gql } from "@apollo/client";

export const FETCH_ORDERS = gql`
  query AdminFetchAllOrder($params: PaginationDto!) {
    AdminFetchAllOrders(paginationQuery: $params) {
      errors
      message
      success
      payload {
        currentPage
        pageSize
        total
        data {
          orderID
          orderStatus
          paymentStatus
          createdAT
          customer {
            name
            email
            phoneNumber
            customerID
          }
          items {
            orderItemID
            price
            product {
              productName
              productID
              price
            }
            quantity
          }
        }
      }
    }
  }
`;
