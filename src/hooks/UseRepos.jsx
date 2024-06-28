import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES, GET_ORDERED_REPOSITORIES, SEARCH_REPOSITORIES, SEARCH_AND_ORDER_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection, searchKeyword, first) => {
  let variables = { first };

  let query;
  if (orderBy && orderDirection && searchKeyword) {
    query = SEARCH_AND_ORDER_REPOSITORIES;
    variables = { ...variables, searchKeyword, orderDirection, orderBy };
  } else if (orderBy && orderDirection) {
    query = GET_ORDERED_REPOSITORIES;
    variables = { ...variables, orderBy, orderDirection };
  } else if (searchKeyword) {
    query = SEARCH_REPOSITORIES;
    variables = { ...variables, searchKeyword };
  } else {
    query = GET_REPOSITORIES;
  }

  const { loading, data, fetchMore, refetch } = useQuery(query, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...prevResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };
      },
    });
  };

  const [repositories, setRepositories] = useState();

  useEffect(() => {
    if (data) {
      setRepositories(data.repositories);
    }
  }, [data]);

  if (loading) return { repositories: null, loading: true, refetch };

  return { repositories, fetchMore: handleFetchMore, loading: false, refetch };
};

export default useRepositories;
