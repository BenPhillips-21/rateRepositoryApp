import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from "react-router-native";

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
  return <View style={styles.container}>
    <ScrollView horizontal>
      <Link to="/">
          <Text>Repositories</Text>
      </Link>
      <Link to="/signin">
        <Text >Sign In</Text>
      </Link>
    </ScrollView>
  </View>;
};

export default AppBar;