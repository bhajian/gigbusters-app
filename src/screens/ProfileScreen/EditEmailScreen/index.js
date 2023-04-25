import React, {useState} from "react";
import {View, Text, ImageBackground, Pressable, TextInput, StyleSheet} from "react-native";
import {Auth} from "aws-amplify";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";

const EditEmailScreen = (props) => {
    const [username, setUsername] = useState('');

    async function onNextPressed() {
        const user = await Auth.currentAuthenticatedUser();

        const result = await Auth.updateUserAttributes(user, {
            name: username,
        });
        console.log(result);
    }

    return (
        <View style={styles.container} >
            <View style={styles.topContainer} >

            </View>
            <View style={styles.mainContainer}>
                <View style={styles.settingItem}>
                    <View style={styles.settingNameContainer}>
                        <FontAwesome5 name="envelope" style={styles.settingIcon}/>
                        <Text style={styles.settingName}> Email </Text>
                    </View>
                    <View style={styles.settingValueContainer}>
                        <CustomInput
                            placeholder="Username"
                            iconCategory="Fontisto"
                            iconName="email"
                            value={username}
                            setValue={setUsername}
                        />
                    </View>
                </View>
                <CustomButton
                    onPress={onNextPressed}
                    style={styles.nextButton}
                    text="Next Step"
                    bgColor="#E3E8F1"
                    fgColor="#000000"
                />
            </View>
        </View>
    )
};

export default EditEmailScreen;

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

