import React, {useEffect, useState} from "react";
import {View, Text, ImageBackground, Pressable, TextInput, StyleSheet, Alert, ScrollView} from "react-native";
import {Auth} from "aws-amplify";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import {useNavigation} from "@react-navigation/native";
import jobAnim from "../../../../assets/animations/107800-login-leady.json";
import Lottie from "lottie-react-native";
import Colors from "../../../constants/Colors";

const VerifyPasswordScreen = ({route}) => {
    const {changeObject, phone} = (route.params ? route.params : '');
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const navigation = useNavigation()

    useEffect( () => {
        loadData().catch(e => console.log(e))
    }, [])

    async function loadData() {
        const currentUser = await Auth.currentAuthenticatedUser()
        setUsername(currentUser.attributes.email)
    }

    async function onNextPressed() {
        try{
            const currentTime = new Date()

            await Auth.signIn(username, password)
            let nextScreen = 'deactivateProfile'
            let payload = {
                currentTime: currentTime.getMilliseconds(),
            }

            if(changeObject === 'deactivate'){
                nextScreen = 'DeactivateProfileScreen'
            }
            if(changeObject === 'email'){
                nextScreen = 'EditEmailScreen'
            }
            if(changeObject === 'phone'){
                nextScreen = 'EditPhoneScreen'
                payload.phoneParam = phone
            }

            navigation.navigate(nextScreen, payload)
        } catch (e){
            Alert.alert(e.message)
            navigation.goBack()
        }
    }

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            headerLargeTitle: false,
            headerLeftContainerStyle: {
                left: 10,
            },
            headerTitle: () => (
                <Text style={{fontSize: 16}}>Verify Your Password</Text>
            ),
            headerTintColor: Colors.light.tint
        })
    }, [])

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
            <View style={styles.topContainer} >
                <Lottie
                    style={{height: 180, width: 180, alignSelf: 'center', margin: 5}}
                    source={jobAnim}
                    autoPlay
                    loop
                />
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.settingItem}>
                    <View style={styles.settingNameContainer}>
                        <FontAwesome5 name="key" style={styles.settingIcon}/>
                        <Text style={styles.settingName}> Verify Your Password </Text>
                    </View>
                    <View style={styles.settingValueContainer}>
                        <CustomInput
                            placeholder="Email"
                            value={username}
                            setValue={setUsername}
                            iconCategory="Fontisto"
                            iconName="email"
                            editable={false}
                        />
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
        </ScrollView>
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
        marginTop: 100,
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

