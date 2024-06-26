import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
    fatherContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    ratingContainer: {
        borderWidth: 2,
        borderColor: '#0366d6',
        height: 'auto',
        margin: 5,
        borderRadius: 13
    },
    repoInfoContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '85%'
    }
  });

export const Review = ({ item }) => {
    console.log(item)
    return (
        <View style={styles.fatherContainer}>
            <View style={styles.ratingContainer}>
                <Text fontSize="subheading" fontWeight="bold" color="primary">{item.rating}</Text>
            </View>
            <View style={styles.repoInfoContainer}>
                <Text fontSize="subheading" fontWeight="bold">{item.user.username}</Text>
                <Text>{item.createdAt}</Text>
                <Text>{item.text}</Text>
            </View>
        </View>
    )
}