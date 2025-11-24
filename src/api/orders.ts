import { gql } from "@apollo/client";

export const FETCH_ORDERS = gql`
  query AdminFetchAllOrder($params: PaginationDto!) {
    AdminFetchAllOrders(paginationQuery: $params) {
      success
      message
      status
      errors
      payload {
        currentPage
        pageSize
        total
        data {
          id
          createdAT
          paymentStatus
          orderStatus
          customer {
            name
            phoneNumber
            email
          }
          merchants {
            businessName
            address
            phoneNumber
          }
          RidersRide {
            rider {
              lastName
              phoneNumber
            }
          }
          items {
            order {
              subTotal
              total
              optimizedRoute {
                lat
                lng
              }
            }
            product {
              priceCurrencyType
              discountedPrice
              discountPercentage
              productColor
              isDiscountApplied
              productName
              productImages
            }
            quantity
            price
          }
          total
          pooledSavings
          subTotal
          total
          deliveryFee
          updatedAT
        }
      }
    }
  }
`;
