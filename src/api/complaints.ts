import { gql } from "@apollo/client";

export const FETCH_ALL_COMPLAINTS = gql`
  query AdminFetchAllComplaintsWithFilter(
    $paginationQuery: PaginatedComplaintFiltersDto!
  ) {
    AdminFetchAllComplaintsWithFilter(paginationQuery: $paginationQuery) {
      success
      message
      payload {
        currentPage
        pageSize
        total
        data {
          category
          closedAt
          closedComplaintsNote
          complaintID
          createdAt
          customer {
            name
            email
            phoneNumber
          }
          deletedAt
          description
          id
          orderID
          resolutionNotes
          resolvedAt
          status
          title
          updatedAt
        }
      }
    }
  }
`;

export const FETCH_COMPLAINTS_METRICS = gql`
  query AdminfetchComplaintMetrics {
    AdminfetchComplaintMetrics {
      errors
      message
      payload
      success
    }
  }
`;
export const FETCH_ONE_COMPLAINTS = gql`
  query AdminfetchaOneComplant($complaintID: String!) {
    AdminfetchaOneComplant(complaintID: $complaintID) {
      errors
      message
      success
      payload {
        category
        closedAt
        closedComplaintsNote
        complaintID
        createdAt
        customer {
          name
          email
          phoneNumber
        }
        deletedAt
        description
        id
        orderID
        resolutionNotes
        resolvedAt
        status
        title
        updatedAt
        proofImage
      }
    }
  }
`;

export const UPDATE_COMPLAINT = gql`
  mutation AdminUpdateComplaint(
    $complaintID: String!
    $input: UpdateComplaintDto!
  ) {
    AdminUpdateComplaint(complaintID: $complaintID, input: $input) {
      errors
      message
      success
      payload {
        category
        closedAt
        closedComplaintsNote
        complaintID
        description
        id
        orderID
        resolutionNotes
        resolvedAt
        status
        title
        updatedAt
      }
    }
  }
`;
