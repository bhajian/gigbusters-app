import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const CustomSettingRowButton = ({onPress, name, value, bgColor,
                                    fgColor, iconCategory, iconName,
                                    valueStyle, nameStyle, hasArrow = true}) => {
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
        if (iconCategory === "MaterialCommunityIcons") {
            return <MaterialCommunityIcons
                size={20}
                style={styles.icon}
                name={iconName}
                style={styles.settingIcon}
            />
        }
    }

    return (
        <View style={styles.settingsContainer}>
            <Pressable style={styles.settingItem} onPress={onPress}>
                <View style={styles.settingNameContainer}>
                    {renderIcon(iconCategory, iconName)}
                    <Text style={[styles.settingName, nameStyle]}>{name}</Text>
                </View>
                <View style={styles.settingValueContainer}>
                    <Text style={[valueStyle, styles.settingValue]} >
                        {value}
                    </Text>
                    {hasArrow? <FontAwesome name="chevron-right" style={styles.settingIcon}/>:<></> }
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    settingsContainer:{
        margin: 10,
        marginTop: 5,
    },
    settingItem:{
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        justifyContent: "space-between",
        paddingBottom: 5,
    },
    settingNameContainer:{
        flexDirection: "row",
        marginLeft: 10,
        paddingBottom: 5,
    },
    settingValueContainer:{
        flexDirection: "row",
        marginRight: 10,
    },
    settingName: {
        color: "grey",
        marginLeft: 5,
    },
    settingIcon: {
        color: "grey",
    },
    settingValue: {
        color: "grey",
        paddingRight: 15,
        alignItems: 'center'
    },
    pressableSetting: {
        flexDirection: "row",
    },
    icon: {

    },
});

export default CustomSettingRowButton;
