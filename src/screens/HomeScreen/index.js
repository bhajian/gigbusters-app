import React from 'react';
import {View, Text, ImageBackground, Pressable, StyleSheet} from 'react-native';
import styles from './styles';
import Feed from '../../components/Feed';
import NewReviewButton from '../../components/NewReviewButton';

const HomeScreen = props => {
    return (
        <View style={styles.container}>
            <Feed/>
            <NewReviewButton/>
        </View>
    );
};

export default HomeScreen;
