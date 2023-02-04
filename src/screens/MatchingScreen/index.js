// import React from 'react';
// import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
// import users from '../../../assets/data/users';
//
// const MatchingScreen = () => {
//   return (
//     <SafeAreaView style={styles.root}>
//       <View style={styles.container}>
//         <Text style={{fontWeight: 'bold', fontSize: 24, color: '#F63A6E'}}>
//           New Matches
//         </Text>
//         <View style={styles.users}>
//           {users.map(user => (
//             <View style={styles.user} key={user.id}>
//               <Image source={{uri: user.image}} style={styles.image} />
//             </View>
//           ))}
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };
//
// const styles = StyleSheet.create({
//   root: {
//     width: '100%',
//     flex: 1,
//     padding: 10,
//   },
//   container: {
//     padding: 10,
//   },
//   users: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   user: {
//     width: 100,
//     height: 100,
//     margin: 10,
//     borderRadius: 50,
//
//     borderWidth: 2,
//     padding: 3,
//     borderColor: '#F63A6E',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 50,
//   },
// });
//
// export default MatchingScreen;

import React from 'react';
import {View, StyleSheet} from 'react-native';
import Card from '../../components/TinderCard';
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
            renderItem={({item}) => <Card user={item} />}
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

