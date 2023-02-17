import React, {useState} from "react";
import {View, Text, ImageBackground, Pressable, TextInput, StyleSheet} from "react-native";
import {Auth} from "aws-amplify";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";

const EditPhotoScreen = (props) => {
    const [username, setUsername] = useState('');

    async function onEditPressed() {
        const user = await Auth.currentAuthenticatedUser();

    }

    return (
        <View style={styles.container} >


        </View>
    )
};

export default EditPhotoScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: '100%',
    },
    topContainer: {
        marginTop: 30,
        height: 150,
        alignItems: "center",
    },
    nextButton: {
        marginTop: 15,
    },
    mainContainer:{
        margin: 20,
        marginTop: 5,
    },
    settingsContainer:{
        margin: 10,
        marginTop: 5,
    },
    settingItem:{
        // flexDirection: "column",
        justifyContent: "space-between",
    },
    settingNameContainer:{
        flexDirection: "row",
        marginLeft: 10,
        paddingBottom: 3,
    },
    settingValueContainer:{
        margin: 10,
    },
    settingName: {
        color: "grey",
        marginLeft: 5,
    },
    settingIcon: {
        color: "grey",
    },
    pressableSetting: {
        flexDirection: "row",
    },
});

