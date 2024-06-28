import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { RepositoryItem } from './RepositoryItem';
import { useState } from 'react';
import useRepositories from '../hooks/UseRepos';
import { Picker } from '@react-native-picker/picker';
import Text from './Text';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pickerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // Ensures the menu appears in front of everything else
    backgroundColor: 'white',
  },
  pickerStyle: {
    width: '100%',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const LePicker = ({ open, setOpen, setOrderBy, setOrderDirection }) => {
  const [leOrder, setLeOrder] = useState('');

  if (!open) return null;

  return (
    <View style={styles.pickerContainer}>
      <Pressable onPress={() => setOpen(!open)}>
        <Text>Order</Text>
      </Pressable>
      <Picker
        style={styles.pickerStyle}
        selectedValue={leOrder}
        onValueChange={(itemValue) => {
          const arrayValue = JSON.parse(itemValue);
          setLeOrder(itemValue);
          setOrderBy(arrayValue[0]);
          setOrderDirection(arrayValue[1]);
          setOpen(!open);
        }}
      >
        <Picker.Item label="Latest Repositories" value={JSON.stringify(["CREATED_AT", "DESC"])} />
        <Picker.Item label="Highest Rated Repositories" value={JSON.stringify(["RATING_AVERAGE", "DESC"])} />
        <Picker.Item label="Lowest Rated Repositories" value={JSON.stringify(["RATING_AVERAGE", "ASC"])} />
      </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  onEndReach,
  orderBy,
  setOrderBy,
  orderDirection,
  setOrderDirection,
  searchKeyword,
  setSearchKeyword,
}) => {
  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

  const [open, setOpen] = useState(false);

  return (
    <View>
      <Searchbar placeholder="Search" onChangeText={setSearchKeyword} value={searchKeyword} />
      <Pressable onPress={() => setOpen(!open)}>
        <Text>Order</Text>
      </Pressable>
      <LePicker open={open} setOpen={setOpen} setOrderBy={setOrderBy} setOrderDirection={setOrderDirection} />
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        keyExtractor={(item) => item.id.toString()} // Ensure the key is unique and converted to a string
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState(null);
  const [orderDirection, setOrderDirection] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [value] = useDebounce(searchKeyword, 500);

  const { repositories, fetchMore, loading } = useRepositories(orderBy, orderDirection, value, 5);

  const onEndReach = () => {
    if (!loading) {
      fetchMore();
    }
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
      orderDirection={orderDirection}
      setOrderDirection={setOrderDirection}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;
