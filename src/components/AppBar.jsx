import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from "react-router-native";
import { GET_ME } from '../graphql/queries';
import { gql, useQuery } from '@apollo/client';
import UseAuthStorage from '../hooks/UseAuthStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'black',
    height: 80,
    display: 'flex',
    flexDirection: 'row'
  },
  heading: {
    color: 'white'
  }
});

const AppBar = () => {
  const authStorage = UseAuthStorage();
  const apolloClient = useApolloClient()
  const { loading, error, data } = useQuery(GET_ME);

  const handleSignOut = () => {
    authStorage.removeAccessToken()
    apolloClient.resetStore();
  }

  return <View style={styles.container}>
    <ScrollView horizontal>
      <Link to="/">
          <Text>Repositories</Text>
      </Link>
      {data && data.me === null ?
      <Link to="/signin">
        <Text >Sign In</Text>
      </Link> :
      <View>
        <Pressable onPress={() => handleSignOut()}><Text>Sign Out</Text></Pressable>
        <Link to="/addreview">
          <Text>Add Review</Text>
        </Link>
      </View>
      }
    </ScrollView>
  </View>;
};

export default AppBar;