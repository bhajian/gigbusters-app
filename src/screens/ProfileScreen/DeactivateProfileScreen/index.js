import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {Auth} from 'aws-amplify';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import Lottie from "lottie-react-native";
import jobAnim from "../../../../assets/animations/107800-login-leady.json";
import {ProfileService} from "../../../backend/ProfileService";

export default function VerifyCodeScreen({navigation, route, updateAuthState}) {
    const {phoneParam} = (route.params ? route.params : '');
    const [authCode, setAuthCode] = useState('');
    const [phone, setPhone] = useState(phoneParam);
    const profileService = new ProfileService()

    async function resendConfirmationCode() {
        try {
            // await Auth.resendSignUp(phone.toString());
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    async function VerifyAccount() {
        try {
            await profileService.validatePhone({
                code: authCode,
                verifyObject: 'phone'
            })
            navigation.navigate('MainProfileScreen')

        } catch (error) {
            Alert.alert(error.message)
            if(error.name === 'NotAuthorizedException'){
                updateAuthState('loggedOut');
                navigation.navigate('SignIn');
            }
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Lottie
                    style={{height: 180, width: 180, alignSelf: 'center', margin: 5}}
                    source={jobAnim}
                    autoPlay
                    loop
                />
                <View style={styles.form}>
                    <CustomInput
                        placeholder="Email"
                        value={phone}
                        iconCategory="Fontisto"
                        iconName="email"
                        editable={false}
                    />
                    <CustomInput
                        placeholder="Code"
                        value={authCode}
                        setValue={setAuthCode}
                        iconCategory="Fontisto"
                        iconName="email"
                    />
                </View>
                <CustomButton
                    text="Verify Your Account"
                    onPress={VerifyAccount}
                    style={styles.component}
                />
                <CustomButton
                    text="Register a new account"
                    // onPress={onBackToSignUpPress}
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
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#ffffff",
        paddingBottom: 10,
        paddingTop: 20,
        paddingLeft: 50,
        paddingRight: 50,
        height: 800,
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
