import { FlatList, Text, View, StyleSheet } from 'react-native';
import { RepositoryItem } from './RepositoryItem'
import { useState, useEffect } from 'react';
import useRepositories from '../hooks/UseRepos';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading, refetch } = useRepositories();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <View>
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({item}) => <RepositoryItem item={item} />}
            keyExtractor={item => item.id}
        />
    </View>
  );
};

export default RepositoryList;