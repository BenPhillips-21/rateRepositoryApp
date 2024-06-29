import { gql } from '@apollo/client';

export const SEARCH_AND_ORDER_REPOSITORIES = gql`
query Repositories($searchKeyword: String, $orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy) {
  repositories(searchKeyword: $searchKeyword, orderDirection: $orderDirection, orderBy: $orderBy) {
    edges {
      node {
        id
        ownerName
        name
        createdAt
        fullName
        ratingAverage
        reviewCount
        stargazersCount
        watchersCount
        forksCount
        openIssuesCount
        url
        ownerAvatarUrl
        description
        language
        userHasReviewed
      }
    }
    totalCount
  }
}
`

export const SEARCH_REPOSITORIES = gql`
query Repositories($searchKeyword: String) {
  repositories(searchKeyword: $searchKeyword) {
    edges {
      node {
        id
        ownerName
        name
        createdAt
        fullName
        ratingAverage
        reviewCount
        stargazersCount
        watchersCount
        forksCount
        openIssuesCount
        url
        ownerAvatarUrl
        description
        language
        userHasReviewed
      }
    }
    totalCount
  }
}
`

export const GET_ORDERED_REPOSITORIES = gql`
query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
    totalCount
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        id
        ownerName
        name
        createdAt
        fullName
        ratingAverage
        reviewCount
        stargazersCount
        watchersCount
        forksCount
        openIssuesCount
        url
        ownerAvatarUrl
        description
        language
        userHasReviewed
      }
    }
  }
}
`;

export const GET_REPOSITORIES = gql`
query Repositories($after: String, $first: Int) {
  repositories(after: $after, first: $first) {
    totalCount
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        id
        ownerName
        name
        createdAt
        fullName
        ratingAverage
        reviewCount
        stargazersCount
        watchersCount
        forksCount
        openIssuesCount
        url
        ownerAvatarUrl
        description
        language
        userHasReviewed
      }
    }
  }
}
`;

export const GET_ME = gql`
query getMe($includeReviews: Boolean = false) {
  me {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          createdAt
          id
          rating
          repositoryId
          text
          userId
          user {
            username
          }
        }
      }
    }
  }
}
`;

export const GET_REPO = gql`
query Repositories($repositoryId: ID!, $after: String, $first: Int) {
  repository(id: $repositoryId) {
    reviews(after: $after, first: $first) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
      edges {
        cursor
        node {
          id
          createdAt
          rating
          text
          user {
            username
          }
        }
      }
    }
    fullName
    id
    createdAt
    description
    forksCount
    language
    name
    openIssuesCount
    ownerAvatarUrl
    ownerName
    ratingAverage
    reviewCount
    stargazersCount
    url
    userHasReviewed
    watchersCount
  }
}
`