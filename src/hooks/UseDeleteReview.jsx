import { gql, useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {

  const [mutate, result] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      console.error("GraphQL error:", error.graphQLErrors[0]?.message || error.message);
    }
  });

  const deleteReview = async ({ deleteReviewId }) => {
    try {
      const result = await mutate({
        variables: {
          deleteReviewId
        }
      });
    } catch (error) {
      // The error is already handled in onError
    }
  };

  return [deleteReview, result];
};

export default useDeleteReview;