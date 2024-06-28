import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from "react-router-native";
import { GET_ME } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import UseAuthStorage from '../hooks/UseAuthStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
    height: 110,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  linksContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    color: 'white'
  },
  link: {
    marginRight: 7,
  },
  activeLink: {
    backgroundColor: 'white',
  },
  repoLinkStyle: {
    marginLeft: 10,
    marginRight: 7
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

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" style={styles.link} underlayColor="transparent" activeOpacity={1}>
          <Text style={styles.repoLinkStyle} fontWeight="bold" fontSize="subheading" color="primary">Repositories</Text>
        </Link>
        {data && data.me === null ?
          <View style={styles.linksContainer}>
            <Link to="/signin" style={styles.link} underlayColor="transparent" activeOpacity={1}>
              <Text style={styles.link} fontWeight="bold" fontSize="subheading" color="primary">Sign In</Text>
            </Link>
            <Link to="/signup" style={styles.link} underlayColor="transparent" activeOpacity={1}>
              <Text style={styles.link} fontWeight="bold" fontSize="subheading" color="primary">Sign Up</Text>
            </Link>
          </View>
          :
          <View style={styles.linksContainer}>
            <Pressable onPress={handleSignOut}>
              <Text style={styles.link} fontSize="subheading" fontWeight="bold" color="primary">Sign Out</Text>
            </Pressable>
            <Link to="/addreview" style={styles.link} underlayColor="transparent" activeOpacity={1}>
              <Text style={styles.link} fontWeight="bold" fontSize="subheading" color="primary">Add Review</Text>
            </Link>
            <Link to="/myreviews" style={styles.link} underlayColor="transparent" activeOpacity={1}>
              <Text style={styles.link} fontWeight="bold" fontSize="subheading" color="primary">My Reviews</Text>
            </Link>
          </View>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;
