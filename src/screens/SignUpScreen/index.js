import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, Linking, Platform, KeyboardAvoidingView} from 'react-native';
import {Auth} from 'aws-amplify';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import jobAnim from "../../../assets/animations/107800-login-leady.json";
import Lottie from "lottie-react-native";
import Colors from "../../constants/Colors";

const SignUpScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            headerLargeTitle: false,
            headerLeftContainerStyle: {
                left: 10,
            },
            headerTitle: () => (
                <Text style={{fontWeight: 'bold'}}> Sign Up</Text>
            ),
            headerTintColor: Colors.light.tint
        })
    }, [])

    async function onRegisterPressed() {
        try {
            if(password != passwordRepeat){
                throw new Error('Password does not match!')
            }
            var lowerEmail = email.toLowerCase();
            const {user, userSub} = await Auth.signUp({
                username: lowerEmail,
                password,
                attributes: {
                    email: lowerEmail,
                    phone_number: ''
                },
            });

            navigation.navigate('Verification',
                {
                    usernameParam: lowerEmail,
                    passwordParam: password,
                })
        } catch (error) {
            alert(error.message)
        }
    }

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    }

    const onConfirmCodePress = () => {
        navigation.navigate('Verification');
    }

    const onTermsOfUsePressed = async () => {
        await Linking.openURL('https://gigbusters.app/?page_id=3')
    }

    const onPrivacyPressed = async() => {
        await Linking.openURL('https://gigbusters.app/?page_id=1045')
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 80}
            style={styles.root}
        >
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View style={styles.container}>
                    <Lottie
                        style={{height: 180, width: 180, alignSelf: 'center', margin: 5}}
                        source={jobAnim}
                        autoPlay
                        loop
                    />
                    <View style={styles.form}>
                        <CustomInput
                            placeholder="Email [UserName]"
                            value={email}
                            setValue={setEmail}
                            iconCategory="Fontisto"
                            iconName="email"
                        />
                        <CustomInput
                            placeholder="Password"
                            value={password}
                            setValue={setPassword}
                            secureTextEntry
                            iconCategory="FontAwesome5"
                            iconName="key"
                        />
                        <CustomInput
                            placeholder="Repeat Password"
                            value={passwordRepeat}
                            setValue={setPasswordRepeat}
                            secureTextEntry
                            iconCategory="FontAwesome5"
                            iconName="key"
                        />
                    </View>
                    <CustomButton
                        text="Register"
                        style={styles.component}
                        onPress={onRegisterPressed}
                    />

                    <Text style={styles.text}>
                        By registering, you confirm that you accept our{' '}
                        <Text style={styles.link} onPress={onTermsOfUsePressed}>
                            Terms of Use
                        </Text>{' '}
                        and{' '}
                        <Text style={styles.link} onPress={onPrivacyPressed}>
                            Privacy Policy
                        </Text>
                    </Text>
                    <CustomButton
                        text="Have an account? Sign in"
                        onPress={onSignInPress}
                        type="SECONDARY"
                    />
                    <CustomButton
                        text="Verify an existing account"
                        onPress={onConfirmCodePress}
                        type="TERTIARY"
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default SignUpScreen;

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
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
        marginBottom: 30
    },
    component: {
        marginTop: 20
    },
    title: {
        marginTop: 20,
        paddingBottom: 90,
        textAlign: "justify",
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
