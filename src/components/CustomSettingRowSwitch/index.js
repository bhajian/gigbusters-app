import React from 'react';
import {View, Text, StyleSheet, Pressable, TextInput, Switch} from 'react-native';
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CustomSwitch from "../CustomSwitch";
import Colors from "../../constants/Colors";
import {MaterialIcons} from "@expo/vector-icons";

const CustomSettingRowSwitch = ({ name,
                                  value,
                                  placeholder,
                                  setValue,
                                  bgColor,
                                  fgColor,
                                  iconCategory,
                                  iconName,
                                  isEnabled,
                                  toggleSwitch,
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
        if (iconCategory === "MaterialIcons") {
            return <MaterialIcons size={18} style={styles.icon} name={iconName} style={styles.settingIcon} />
        }
        if (iconCategory === "MaterialIcons") {
            return <MaterialIcons size={18} style={styles.icon} name={iconName} style={styles.settingIcon} />
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
                    <Switch
                        trackColor={{false: '#a9a0b0', true: Colors.light.tint}}
                        ios_backgroundColor="#a9a0b0"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        style={styles.privateSwitch}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    settingsContainer:{
        margin: 10,
        marginTop: 5,
    },
    settingItem:{
        flexDirection: 'row',
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
        marginHorizontal: 5,
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
    privateSwitch: {
        transform: [
            {scaleX: 0.7},
            {scaleY: 0.7}
        ],
    },
    settingValueDisabled: {
        color: "grey",
        paddingHorizontal: 5,
    },
    pressableSetting: {
        flexDirection: "row",
    },
});

export default CustomSettingRowSwitch;
