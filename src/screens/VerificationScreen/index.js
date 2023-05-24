import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Platform, KeyboardAvoidingView} from 'react-native';
import {Auth} from 'aws-amplify';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Lottie from "lottie-react-native";
import jobAnim from "../../../assets/animations/107800-login-leady.json";

export default function VerificationScreen({navigation, route, updateAuthState}) {
    const {usernameParam, passwordParam} = (route.params ? route.params : '')
    const [authCode, setAuthCode] = useState('')
    const [username, setUsername] = useState(usernameParam)


    async function resendConfirmationCode() {
        try {
            if(!username?.trim()){
                alert('Please enter the email associated to the account.')
                return
            }
            await Auth.resendSignUp(username)
        } catch (error) {
            alert(error.message)
        }
    }
    const onBackToSignUpPress = () => {
        navigation.navigate('SignUp');
    };
    async function VerifyAccount() {
        try {
            updateAuthState('initializing')
            await Auth.confirmSignUp(username, authCode)
            if(username && passwordParam){
                const user = await Auth.signIn(username, passwordParam)
                updateAuthState('profileCreation')
            } else{
                updateAuthState('loggedOut')
                navigation.navigate('SignIn')
            }
        } catch (error) {
            alert(error.message)
            updateAuthState('loggedOut')
            if(error.name === 'NotAuthorizedException'){
                navigation.navigate('SignIn')
            }
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 90}
            style={styles.root}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='handled'
            >
                <View style={styles.container}>
                    <Lottie
                        style={{height: 180, width: 180, alignSelf: 'center', margin: 5}}
                        source={jobAnim}
                        autoPlay
                        loop
                    />
                    <View style={styles.form}>
                        <CustomInput
                            placeholder="Email"
                            value={username}
                            setValue={setUsername}
                            iconCategory="Fontisto"
                            iconName="email"
                            editable={(!usernameParam? true : false)}
                        />
                        <CustomInput
                            placeholder="Code"
                            value={authCode}
                            setValue={setAuthCode}
                            iconCategory="Octicons"
                            iconName="number"
                            keyboardType="numeric"
                        />
                    </View>
                    <CustomButton
                        text="Verify Your Account"
                        onPress={VerifyAccount}
                        style={styles.component}
                    />
                    <CustomButton
                        text="Register a new account"
                        onPress={onBackToSignUpPress}
                        type="TERTIARY"
                    />
                    <Text style={styles.text}>
                        Didn't receive the verification code? {' '}
                        <Text style={styles.link} onPress={resendConfirmationCode}>
                            Click Here.
                        </Text>
                    </Text>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#ffffff",
        paddingBottom: 10,
        paddingTop: 20,
        height: '100%',
    },
    container:{
        marginHorizontal: 30
    },
    form: {
        marginTop: 15,
    },
    component: {
        marginTop: 20
    },
    title: {
        marginTop: 20,
        paddingBottom: 90,
        // textAlign: "justify",
        fontSize: 40,
        color: "#ff6200"
    },
    link: {
        color: "#ff6200"
    },
    text: {
        marginTop: 20,
    },
    registerButton: {
        marginTop: 40,
    },
});
