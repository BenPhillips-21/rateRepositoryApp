import { GET_REPO } from '../graphql/queries';
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery, gql } from '@apollo/client';
import Text from './Text';
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

    let first = 7;

    const { loading, error, fetchMore, data } = useQuery(GET_REPO, {
        fetchPolicy: 'cache-and-network',
        variables: { repositoryId, first },
    }); // REMEMBER..... the variable name MUST match the query definition

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    const { repository } = data;

    const reviewNodes = repository
        ? repository.reviews.edges.map((edge) => edge.node)
        : [];

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                repositoryId,
                after: data.repository.reviews.pageInfo.endCursor,
                first,
            },
            updateQuery: (prevResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prevResult;
                return {
                    repository: {
                        ...prevResult.repository,
                        reviews: {
                            ...fetchMoreResult.repository.reviews,
                            edges: [
                                ...prevResult.repository.reviews.edges,
                                ...fetchMoreResult.repository.reviews.edges,
                            ],
                        },
                    },
                };
            },
        });
    };

    const onEndReach = () => {
        console.log("on end reach called");
        if (!loading) {
            handleFetchMore();
        }
    };

    return (
        <>
            {reviewNodes && (
                <FlatList
                    data={reviewNodes}
                    ItemSeparatorComponent={ItemSeparator}
                    renderItem={({ item }) => <Review item={item} />}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={() => <RepositoryItem item={repository} key={repository.id} />}
                    onEndReached={onEndReach}
                    onEndReachedThreshold={0.5}
                />
            )}
        </>
    );
};

export default RepoItem;
