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
          merchant {
            businessName
            merchantID
            bank_details {
              accountNumber
            }
          }
          rider {
            riderID
            firstName
            lastName
            bank_details {
              accountNumber
            }
          }
          customer {
            customerID
            name
          }
          payoutID
          netPayout
          paymentMethod
          paymentStatus
          commision
          payoutAt
          createdAt
          payoutRequetID
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
        payoutID
        payoutAt
        paymentMethod
        invoiceStatus
        paymentStatus
        merchant {
          businessName
          merchantID
          bank_details {
            accountName
            accountNumber
            bankName
            bankCode
          }
        }
        rider {
          firstName
          lastName
          riderID
          bank_details {
            accountName
            accountNumber
            bankName
            bankCode
          }
        }
        customer {
          name
          customerID
          bank_details {
            accountName
            accountNumber
            bankName
            bankCode
          }
        }
        grossSaleAmount
        commision
        taxDeduction
        processingFee
        totalDeductions
        netPayout
        relatedOrders {
          orderID
        }
        completedBy {
          adminAccess
          name
        }
        completedOn
        transactionReference
        paymentNote
        paymentReceipt
        payoutRequetID
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
      errors
    }
  }
`;

export const COMPLETE_EXTERNAL_TRANSFER = gql`
  mutation AdminCompleteExternalTransferPayout(
    $input: CompleteExternalTransferDto!
  ) {
    AdminCompleteExternalTransferPayout(input: $input) {
      success
      message
      payload
      errors
    }
  }
`;

export const ADMIN_VERIFY_PAYSTACK = gql`
  mutation AdminVerifyPaystackTransfer($input: VerifyPaystackTransferDto!) {
    AdminVerifyPaystackTransfer(input: $input) {
      success
      message
      payload
      errors
    }
  }
`;

export const ADMIN_INITIATE_CUSTOMER_PAYOUT = gql`
  mutation AdminInitiateCustomerPayout($input: InitiateCustomerPayoutDto!) {
    AdminInitiateCustomerPayout(input: $input) {
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
