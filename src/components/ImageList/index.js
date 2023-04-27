import React from 'react';
import {View, Text, StyleSheet, Pressable, TouchableOpacity, Image} from 'react-native';
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../constants/Colors";

const ImageList = ({ item, remove }) => {
  return <View>
    <TouchableOpacity
        onPress={(e) => remove(item)}
        style={styles.ImageItem}>
      <Feather name="x-circle" style={styles.icon}/>
      <Image source={{uri: item}} style={ {width: 100, height: 100 }} />
    </TouchableOpacity>
  </View>
}

export default ImageList

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',

  },
  icon: {
    fontSize: 17,
    color: Colors.light.tint,
  },
  ImageItem: {

  },
})
