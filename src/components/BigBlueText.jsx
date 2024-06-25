import { Text, View, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    color: 'blue',
    fontSize: 24,
    fontWeight: '700',
  },
});

const BigBlueText = () => {
  return (

    <View style={styles.container}>
      <Text style={styles.text}>
        Big blue text
      </Text>
    </View>
  );
};

export default BigBlueText