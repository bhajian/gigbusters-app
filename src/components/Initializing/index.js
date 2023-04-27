import React from 'react';
import {View, Text, StyleSheet, Pressable, TouchableOpacity, Image} from 'react-native';
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../constants/Colors";
import Lottie from "lottie-react-native";
import loadingAnim from "../../../assets/animations/136078-feesbee-section-2.json";

const Initializing = () => {
  return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Lottie source={loadingAnim} autoPlay loop />
      </View>
  )
}

export default Initializing

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
