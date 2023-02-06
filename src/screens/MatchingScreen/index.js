import React from 'react';
import {View, StyleSheet} from 'react-native';
import MatchingCard from '../../components/MatchingCard';
import users from '../../../assets/data/users';

import AnimatedStack from '../../components/AnimatedStack';

const MatchingScreen = () => {
  const onSwipeLeft = user => {
    console.warn('swipe left', user.name);
  };

  const onSwipeRight = user => {
    console.warn('swipe right: ', user.name);
  };

  return (
      <View style={styles.pageContainer}>
        <AnimatedStack
            data={users}
            renderItem={({item}) => <MatchingCard user={item} />}
            onSwipeLeft={onSwipeLeft}
            onSwipeRight={onSwipeRight}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
});

export default MatchingScreen;

