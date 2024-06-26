import { gql, useMutation } from '@apollo/client';
import { USER_SIGNUP } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

const useSignUp = () => {
    const navigate = useNavigate();

  const [mutate, result] = useMutation(USER_SIGNUP, {
    onError: (error) => {
      console.error("GraphQL error:", error.graphQLErrors[0]?.message || error.message);
    }
  });

  const signUp = async ({ username, password }) => {
    try {
      await mutate({
        variables: {
          user: { username, password }
        }
      });
        navigate("/signin")
    } catch (error) {
      // The error is already handled in onError
    }
  };

  return [signUp, result];
};

export default useSignUp;
