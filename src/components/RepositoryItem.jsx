import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
    fatherContainer: {
      },
    tinyLogo: {
      margin: 10,
      width: 50,
      height: 50,
    },
    logoAndInfo: {
        display: 'flex',
        flexDirection: 'row'
    },
    repoInfo: {
        display: 'flex',
        flexDirection: 'column',
        margin: 10,
        border: '1px solid black'
    },
    repoStats: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    repoStatContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        marginLeft: 10,
        marginRight: 10
    }
  });

const formatCount = (count) => {
if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
}
return count.toString();
};

export const RepositoryItem = ({ item }) => {
    return (
        <View style={styles.fatherContainer}>
            <View style={styles.logoAndInfo}>
                <View>
                    <Image 
                    style={styles.tinyLogo}
                    source={{ uri: item.ownerAvatarUrl}}
                    />
                </View>
                <View style={styles.repoInfo}>
                    <Text fontWeight="bold" fontSize="subheading">{item.fullName}</Text>
                    <Text>{item.description}</Text>
                    <Text color="primary">{item.language}</Text>
                </View>
            </View>
            <View style={styles.repoStats}>
                <View style={styles.repoStatContainer}>
                    <Text>{formatCount(item.forksCount)}</Text>
                    <Text>Forks</Text>
                </View>
                <View style={styles.repoStatContainer}>
                    <Text>{formatCount(item.stargazersCount)}</Text>
                    <Text>Stars</Text>
                </View>
                <View style={styles.repoStatContainer}>
                    <Text>{formatCount(item.ratingAverage)}</Text>
                    <Text>Rating</Text>
                </View>
                <View style={styles.repoStatContainer}>
                    <Text>{formatCount(item.reviewCount)}</Text>
                    <Text>Reviews</Text>
                </View>
            </View>
        </View>
    )
}