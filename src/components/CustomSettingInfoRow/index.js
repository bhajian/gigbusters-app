import React from 'react';
import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native';
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const CustomSettingInfoRow = ({ onPress,
                              name,
                              value,
                              placeholder,
                              setValue,
                              bgColor,
                              fgColor,
                              iconCategory,
                              iconName,
                              editable = true,
                              style,
                              multiline = false}) => {
    const renderIcon = (iconCategory, iconName) => {
        if (iconCategory === "Fontisto") {
            return <Fontisto size={18} style={styles.icon} name={iconName} style={styles.settingIcon} />
        }
        if (iconCategory === "FontAwesome5") {
            return <FontAwesome5 size={18} style={styles.icon} name={iconName} style={styles.settingIcon} />
        }
        if (iconCategory === "FontAwesome") {
            return <FontAwesome size={18} style={styles.icon} name={iconName} style={styles.settingIcon} />
        }
    }

    return (
        <View style={styles.settingsContainer}>
            <View style={styles.settingItem}>
                <View style={styles.settingNameContainer}>
                    {renderIcon(iconCategory, iconName)}
                    <Text style={styles.settingName}>
                        {name}
                    </Text>
                </View>
                <View style={styles.settingValueContainer}>
                    <Text>{value}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    settingsContainer:{
        margin: 10,
        marginTop: 5,
        width: '100%',
    },
    settingItem:{
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        justifyContent: "space-between",
        paddingBottom: 5,
        width: '100%',
    },
    settingNameContainer:{
        flexDirection: "row",
        marginLeft: 10,
        paddingBottom: 5,
    },
    settingValueContainer:{
        marginHorizontal: 5,
        marginRight: 30
    },
    settingName: {
        color: "grey",
        marginLeft: 5,
    },
    settingIcon: {
        color: "grey",
    },
    settingValue: {
        paddingHorizontal: 5,
    },
    settingValueDisabled: {
        color: "grey",
        paddingHorizontal: 5,
    },
    pressableSetting: {
        flexDirection: "row",
    },
});

export default CustomSettingInfoRow;
