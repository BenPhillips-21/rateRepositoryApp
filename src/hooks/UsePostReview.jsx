import { gql, useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

const usePostReview = () => {
    const navigate = useNavigate();

  const [mutate, result] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      console.error("GraphQL error:", error.graphQLErrors[0]?.message || error.message);
    }
  });

  const postReview = async ({ ownerName, rating, repositoryName, text }) => {
    try {
        rating = Number(rating)
      const result = await mutate({
        variables: {
          review: { ownerName, rating, repositoryName, text }
        }
      });
        navigate(`/review/${result.repositoryId}`)
    } catch (error) {
      // The error is already handled in onError
    }
  };

  return [postReview, result];
};

export default usePostReview;