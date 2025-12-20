import { gql } from "@apollo/client";

export const GET_PAYOUTS = gql`
  query AdminFetchAllPayoutsWithFilter(
    $paginationQuery: PaginatedPayoutFiltersDto!
  ) {
    AdminFetchAllPayoutsWithFilter(paginationQuery: $paginationQuery) {
      success
      message
      payload {
        currentPage
        pageSize
        total
        data {
          commision
          createdAt
        }
      }
    }
  }
`;

export const FETCH_ONE_PAYOUT = gql`
  query AdminFetchOnePayout($payoutID: String!) {
    AdminFetchOnePayout(payoutID: $payoutID) {
      success
      message
      payload {
        commision
        completedOn
        createdAt
        deletedAt
        grossSaleAmount
        id
        invoiceStatus
        netPayout
        paymentMethod
        paymentNote
        paymentReceipt
        paymentStatus
        payoutAt
        payoutID
      }
    }
  }
`;

export const GET_ONE_PAYOUT_STATUS = gql`
  query AdmingetPayoutStatus($payoutID: String!) {
    AdmingetPayoutStatus(payoutID: $payoutID) {
      success
      message
      payload
    }
  }
`;

export const ADMIN_INITIATE_PAYOUT = gql`
  mutation AdminInitiatePayout($input: InitiatePayoutDto!) {
    AdminInitiatePayout(input: $input) {
      success
      message
      payload
    }
  }
`;

export const ADMIN_CANCEL_PAYOUT = gql`
  mutation AdminCancelPayout($input: CancelPayoutDto!) {
    AdminCancelPayout(input: $input) {
      success
      message
      payload
    }
  }
`;
