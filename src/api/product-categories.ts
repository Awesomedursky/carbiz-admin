import { gql } from "@apollo/client";

export const FETCH_ALL_PRODUCT_CATEGORY = gql`
  query AdminFetchAllProductCategoriesWithFilter(
    $paginationQuery: PaginatedProductCategoryFiltersDto!
  ) {
    AdminFetchAllProductCategoriesWithFilter(
      paginationQuery: $paginationQuery
    ) {
      errors
      message
      payload {
        currentPage
        pageSize
        total
        data {
          createdAt
          productCategoryID
          productCategoryName
        }
      }
    }
  }
`;

export const FETCH_ONE_PRODUCT_CATEGORY = gql`
  query fetchOneProductCategory($productCategoryID: String!) {
    fetchOneProductCategory(productCategoryID: $productCategoryID) {
      errors
      message
      payload {
        createdAt
        productCategoryID
        productCategoryName
        products {
          productName
          productImages
        }
      }
    }
  }
`;

export const ADD_PRODUCT_CATEGORY = gql`
  mutation createProductCategory($input: CreateProductCategoryDto!) {
    createProductCategory(input: $input) {
      success
      message
      payload {
        createdAt
        productCategoryID
        productCategoryName
      }
    }
  }
`;
export const UPDATE_PRODUCT_CATEGORY = gql`
  mutation updateProductCategory(
    $input: UpdateProductCategoryDto!
    $productCategoryID: String!
  ) {
    updateProductCategory(
      input: $input
      productCategoryID: $productCategoryID
    ) {
      success
      message
      payload {
        createdAt
        productCategoryID
        productCategoryName
      }
    }
  }
`;

export const DELETE_PRODUCT_CATEGORY = gql`
  mutation deleteProductCategory($productCategoryID: String!) {
    deleteProductCategory(productCategoryID: $productCategoryID) {
      success
      message
      payload
    }
  }
`;
