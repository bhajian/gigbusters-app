import React from 'react';
import {View, Text, ImageBackground, Pressable, StyleSheet} from 'react-native';
import Reviewable from '../../components/Reviewable';
import tipoffs from '../../../assets/data/tipoffs';
import styles from './styles';
import Feed from '../../components/Feed';
import NewTipoffButton from '../../components/NewTipoffButton';
import Colors from '../../constants/Colors';

const HomeScreen = props => {
    return (
        <View style={styles.container}>
            <Feed/>
            <NewTipoffButton/>
        </View>
    );
};

export default HomeScreen;
