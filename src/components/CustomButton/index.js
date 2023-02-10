import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from "react-native-vector-icons/Entypo";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const CustomButton = ({
  onPress,
  text,
  type = 'PRIMARY',
  bgColor,
  fgColor,
  iconCategory,
  iconName,
  iconStyle,
  style,
}) => {
  const renderIcon = (iconCategory, iconName) => {
    if (iconCategory === 'Fontisto') {
      return <Fontisto style={[styles.icon, iconStyle]} name={iconName} />;
    }
    if (iconCategory === 'Entypo') {
      return <Entypo style={[styles.icon, iconStyle]} name={iconName} />;
    }
    if (iconCategory === 'MaterialCommunityIcons') {
      return <MaterialCommunityIcons style={[styles.icon, iconStyle]} name={iconName} />;
    }
    if (iconCategory === 'FontAwesome5') {
      return <FontAwesome5 style={[styles.icon, iconStyle]} name={iconName} />;
    }
    if (iconCategory === 'FontAwesome') {
      return <FontAwesome style={[styles.icon, iconStyle]} name={iconName} />;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        style,
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>

      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {},
        ]}>
        {text}
      </Text>
      {renderIcon(iconCategory, iconName)}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    padding: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',

  },
  icon: {
    padding: 0,
    color: '#ffffff',
    fontSize: 25,
    paddingRight: 10,
  },
  container_PRIMARY: {
    backgroundColor: '#ff6200',
  },
  container_SECONDARY: {
    borderColor: '#f89e7a',
    borderWidth: 2,
  },
  container_TERTIARY: {

  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },

  text_SECONDARY: {
    color: '#3B71F3',
  },

  text_TERTIARY: {
    color: 'gray',
  },
});

export default CustomButton;
