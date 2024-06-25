import { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { Text } from 'react-native';

const useRepositories = () => {
  const { loading, data, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

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
