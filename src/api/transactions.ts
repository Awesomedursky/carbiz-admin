import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query AdminFetchAllTransactions($params: PaginationDto!) {
    AdminFetchAllTransactions(paginationQuery: $params) {
      success
      message
      payload {
        currentPage
        pageSize
        total
        data {
          amount
          merchant {
            businessName
            merchantID
          }
          status
          transactionID
          createdAT
        }
      }
    }
  }
`;

export const GET_ONE_TRANSACTION = gql`
  query AdminFetchOneTransaction($transactionID: String!) {
    AdminFetchOneTransaction(transactionID: $transactionID) {
      success
      message
      payload {
        amount
        merchant {
          businessName
          merchantID
        }
        status
        transactionID
        createdAt
      }
    }
  }
`;
