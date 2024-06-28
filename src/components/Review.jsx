import React from 'react';
import { View, StyleSheet, Pressable, Alert } from 'react-native';
import Text from './Text';
import { format } from 'date-fns'
import { gql, useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import useDeleteReview from '../hooks/UseDeleteReview';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
    fatherContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    ratingContainer: {
        borderWidth: 2,
        borderColor: '#0366d6',
        margin: 5,
        marginTop: 0,
        borderRadius: 100,
        height: 40,
        padding: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    repoInfoContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '83%'
    },
    ratingText: {
        fontSize: 17,
    }
  });

export const Review = ({ item }) => {
    const apolloClient = useApolloClient()
    const { loading, error, data } = useQuery(GET_ME, {
        fetchPolicy: 'cache-and-network',
    });
    const [deleteReview, { dat, loadin, err }] = useDeleteReview();

    const handleDeleteReview = async () => {
        try {
            Alert.alert('Caution', 'Are you sure you want to delete this review?', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => proceedWithDeletion()},
              ]);

        } catch (err) {
            console.log(err)
        }
    }

    const proceedWithDeletion = async () => {
        const deleteReviewId = item.id
        await deleteReview({deleteReviewId})
        apolloClient.resetStore();
    }
    
      if (loading) return <Text>Loading...</Text>;
      if (error) return <Text>Error: {error.message}</Text>;

    return (
        <View style={styles.fatherContainer}>
            <View style={styles.ratingContainer}>
                <Text style={styles.ratingText} fontSize="subheading" fontWeight="bold" color="primary">{item.rating}</Text>
            </View>
            <View style={styles.repoInfoContainer}>
                <Text fontSize="subheading" fontWeight="bold">{item.user.username}</Text>
                <Text>{format(item.createdAt, 'MM/dd/yyyy')}</Text>
                <Text>{item.text}</Text>
                {data.me && data.me.username === item.user.username && (
                <View>
                    {/* <Pressable onPress={handleRepoPress}><Text>View Repository</Text></Pressable> */}
                    <Pressable onPress={handleDeleteReview}>
                    <Text>Delete Review</Text>
                    </Pressable>
                </View>
                )}
            </View>

        </View>
    )
}