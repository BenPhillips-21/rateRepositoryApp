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

export const RepositoryListContainer = ({repositories}) => {

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

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;