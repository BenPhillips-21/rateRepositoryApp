import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import { format } from 'date-fns'

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
    return (
        <View style={styles.fatherContainer}>
            <View style={styles.ratingContainer}>
                <Text style={styles.ratingText} fontSize="subheading" fontWeight="bold" color="primary">{item.rating}</Text>
            </View>
            <View style={styles.repoInfoContainer}>
                <Text fontSize="subheading" fontWeight="bold">{item.user.username}</Text>
                <Text>{format(item.createdAt, 'MM/dd/yyyy')}</Text>
                <Text>{item.text}</Text>
            </View>
        </View>
    )
}