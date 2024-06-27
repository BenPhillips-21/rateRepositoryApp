import { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { GET_REPOSITORIES, GET_ORDERED_REPOSITORIES, SEARCH_REPOSITORIES, SEARCH_AND_ORDER_REPOSITORIES } from '../graphql/queries';
import { Text } from 'react-native';

const useRepositories = (orderBy, orderDirection, searchKeyword) => {

  if (orderBy && orderDirection && searchKeyword) {
    var { loading, data, refetch } = useQuery(SEARCH_AND_ORDER_REPOSITORIES, {
      variables: {
        searchKeyword, orderDirection, orderBy
      },
      fetchPolicy: 'cache-and-network',
    });
  } else if (orderBy && orderDirection) {
    var { loading, data, refetch } = useQuery(GET_ORDERED_REPOSITORIES, {
      variables: {
        orderBy, orderDirection
      },
      fetchPolicy: 'cache-and-network',
    });
  } else if (searchKeyword) {
    var { loading, data, refetch } = useQuery(SEARCH_REPOSITORIES, {
      variables: {
        searchKeyword
      },
      fetchPolicy: 'cache-and-network',
    });
  } else {
    var { loading, data, refetch } = useQuery(GET_REPOSITORIES, {
      fetchPolicy: 'cache-and-network',
    });
  }

  const [repositories, setRepositories] = useState();

  useEffect(() => {
    if (data) {
      setRepositories(data.repositories);
    }
  }, [data]);

  if (loading) return { repositories: null, loading: true, refetch };

  return { repositories, loading: false, refetch };
};

export default useRepositories;
