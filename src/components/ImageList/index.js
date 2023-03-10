import React from 'react';
import {View, Text, StyleSheet, Pressable, TouchableOpacity, Image} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from "react-native-vector-icons/Entypo";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Feather from "react-native-vector-icons/Feather";
import CustomButton from "../CustomButton";
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
