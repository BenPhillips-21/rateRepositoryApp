import { View, Image, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
    fatherContainer: {
      },
    tinyLogo: {
      marginTop: 5,
      marginLeft: 10,
      marginRight: 0,
      width: 65,
      height: 65,
      borderRadius: '50%'
    },
    logoAndInfo: {
        display: 'flex',
        flexDirection: 'row'
    },
    repoInfo: {
        display: 'flex',
        flexDirection: 'column',
        margin: 10,
        border: '1px solid black',
        width: '80%'
    },
    repoStats: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -8
    },
    repoStatContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        marginLeft: 10,
        marginRight: 10
    },
    languageContainer: {
        backgroundColor: '#0366d6',
        paddingHorizontal: 3,
        paddingVertical: 3,
        borderRadius: 5,
        alignSelf: 'flex-start',
        marginTop: 5,
      },
      languageText: {
        color: 'white'
      }
  });

const formatCount = (count) => {
if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
}
return count.toString();
};



export const RepositoryItem = ({ item }) => {
    const navigate = useNavigate()

    const handleRepoPress = (itemID) => {
        navigate(`/repoitem/${itemID}`)
      }

    return (
        <View testID="repoItem" style={styles.fatherContainer}>
            <View style={styles.logoAndInfo}>
                {item.ownerAvatarUrl && <View>
                    <Image 
                    style={styles.tinyLogo}
                    source={{ uri: item.ownerAvatarUrl}}
                    />
                </View>}
                <View style={styles.repoInfo}>
                    <Pressable onPress={() => handleRepoPress(item.id)}><Text fontWeight="bold" fontSize="subheading">{item.fullName}</Text></Pressable>
                    <Text>{item.description}</Text>
                    <View style={styles.languageContainer}>
                        <Text style={styles.languageText}>{item.language}</Text>
                    </View>
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