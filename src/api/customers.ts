import { gql } from "@apollo/client";

export const GET_CUSTOMERS = gql`
  query AdminFetchAllCustomersWithFilter(
    $paginationQuery: PaginatedCustomerFiltersDto!
  ) {
    AdminFetchAllCustomersWithFilter(paginationQuery: $paginationQuery) {
      success
      message
      payload {
        currentPage
        pageSize
        total
        data {
          name
          email
          phoneNumber
          createdAt
          customerID
        }
      }
    }
  }
`;

export const GET_ONE_CUSTOMER = gql`
  query AdminFetchOneCustomer($customerID: String!) {
    AdminFetchOneCustomer(customerID: $customerID) {
      success
      message
      payload {
        name
        email
        phoneNumber
        createdAt
        customerID
        my_orders {
          orderID
          orderStatus
          paymentStatus
          items {
            orderItemID
            product {
              productName
            }
          }
        }
      }
    }
  }
`;
