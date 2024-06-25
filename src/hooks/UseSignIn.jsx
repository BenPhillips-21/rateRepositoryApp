import { gql, useMutation } from '@apollo/client';
import { USER_LOGIN } from '../graphql/mutations';
import UseAuthStorage from '../hooks/UseAuthStorage';
import { useNavigate } from 'react-router-native';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
  const apolloClient = useApolloClient()
    const navigate = useNavigate();
    const authStorage = UseAuthStorage();

  const [mutate, result] = useMutation(USER_LOGIN, {
    onError: (error) => {
      console.error("GraphQL error:", error.graphQLErrors[0]?.message || error.message);
    }
  });

  const signIn = async ({ username, password }) => {
    try {
      const result = await mutate({
        variables: {
          credentials: { username, password }
        }
      });
        await authStorage.setAccessToken(result.data.authenticate.accessToken)
        apolloClient.resetStore();
        navigate("/")
    } catch (error) {
      // The error is already handled in onError
    }
  };

  return [signIn, result];
};

export default useSignIn;
