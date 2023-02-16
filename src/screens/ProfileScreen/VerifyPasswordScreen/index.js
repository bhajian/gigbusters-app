import React, {useState} from "react";
import {View, Text, ImageBackground, Pressable, TextInput, StyleSheet, Alert} from "react-native";
import {Auth} from "aws-amplify";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import {useNavigation} from "@react-navigation/native";

const VerifyPasswordScreen = ({route}) => {
    const {changeObject, phone} = (route.params ? route.params : '');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    async function onNextPressed() {
        try{
            const currentTime = new Date()
            const currentUser = await Auth.currentAuthenticatedUser()
            const username = currentUser.attributes.email
            await Auth.signIn(username, password)
            navigation.navigate((changeObject === 'email'?
                'EditEmailScreen' : 'EditPhoneScreen'),
                {
                    currentTime: currentTime.getMilliseconds(),
                    phoneParam: phone
                });
        } catch (e){
            Alert.alert(e.message)
        }

    }

    return (
        <View style={styles.container} >
            <View style={styles.topContainer} >

            </View>
            <View style={styles.mainContainer}>
                <View style={styles.settingItem}>
                    <View style={styles.settingNameContainer}>
                        <FontAwesome5 name="key" style={styles.settingIcon}/>
                        <Text style={styles.settingName}> Verify Your Password </Text>
                    </View>
                    <View style={styles.settingValueContainer}>
                        <CustomInput
                            placeholder="Password"
                            iconCategory="FontAwesome5"
                            iconName="key"
                            setValue={setPassword}
                            secureTextEntry
                        />
                        <CustomButton
                            onPress={onNextPressed}
                            style={styles.nextButton}
                            text="Next Step"
                            bgColor="#E3E8F1"
                            fgColor="#000000"
                        />
                    </View>

                </View>

            </View>
        </View>
    )
};

export default VerifyPasswordScreen;

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
        flexDirection: "column",
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

