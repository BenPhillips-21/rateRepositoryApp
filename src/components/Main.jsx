import { StyleSheet, View } from 'react-native';
import AppBar from './AppBar'
import RepositoryList from './RepositoryList'
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';
import RepoItem from './SingleRepoItem';
import ReviewForm from './ReviewForm'
import SignUp from './SignUp';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>        
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/repoitem/:itemid" element={<RepoItem/>} />
        <Route path="/addreview" element={<ReviewForm/>} />
        <Route path="*" element={<Navigate to="/" replace />} />      
      </Routes>
    </View>
  );
};

export default Main;