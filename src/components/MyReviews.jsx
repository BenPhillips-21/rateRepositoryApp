import { View, FlatList, StyleSheet } from 'react-native'
import Text from './Text'
import { GET_ME } from '../graphql/queries';
import { gql, useQuery } from '@apollo/client';
import { Review } from './Review';

const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
  });
  
const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
    const { loading, error, data } = useQuery(GET_ME, {
        variables: {
            includeReviews: true
        }
    }); 

    const reviewNodes = data
    ? data.me.reviews.edges.map(edge => edge.node)
    : [];

    if (loading) {return (<View><Text>Loading My Reviews...</Text></View>)}
    if (error) {return (<View><Text>Error Occurred Loading My Reviews...</Text></View>)}

    return (
        <View>
            {reviewNodes && 
            <FlatList
                data={reviewNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({item}) => <Review item={item} />}
                keyExtractor={item => item.id}
            />}
        </View>
    )
}

export default MyReviews