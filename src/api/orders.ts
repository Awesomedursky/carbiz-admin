import { gql } from "@apollo/client";

export const FETCH_ORDERS = gql`
  query AdminFetchAllOrdersWithFilter(
    $paginationQuery: PaginatedOrderFiltersDto!
  ) {
    AdminFetchAllOrdersWithFilter(paginationQuery: $paginationQuery) {
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
          orderID
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

export const FETCH_ONE_ORDER = gql`
  query AdminfetchaOneOrder($orderID: String!) {
    AdminfetchaOneOrder(orderID: $orderID) {
      success
      message
      status
      errors
      payload {
        orderID
        deliveryType
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
          at_dropoff_locationAT
          dropped_off_parcelAT
          enroute_to_dropoff_locationAT
          picked_up_parcelAT
          milestone
          rider {
            firstName
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
            price
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
`;
