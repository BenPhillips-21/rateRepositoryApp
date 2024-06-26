import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_REPO } from '../graphql/queries';
import Text from './Text';
import { useQuery } from '@apollo/client';
import { RepositoryItem } from './RepositoryItem';
import { Review } from './Review';

const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
  });
  
const ItemSeparator = () => <View style={styles.separator} />;

const RepoItem = () => {
  const { itemid: repositoryId } = useParams();

  console.log(repositoryId)

  const { loading, error, data } = useQuery(GET_REPO, {
    variables: { repositoryId },
  });            //   REMEMBER..... the variable name MUST match the query definition

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const { repository } = data;

  const reviewNodes = repository
  ? repository.reviews.edges.map(edge => edge.node)
  : [];

  console.log(reviewNodes)

  return (
    <>
            {reviewNodes && 
            <FlatList
                data={reviewNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({item}) => <Review item={item} />}
                keyExtractor={item => item.id}
                ListHeaderComponent={() => <RepositoryItem item={repository} />}
            />}
    </>
  );
};

export default RepoItem;

