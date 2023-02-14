import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {Auth} from 'aws-amplify';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import jobAnim from "../../../assets/animations/107800-login-leady.json";
import Lottie from "lottie-react-native";

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const navigation = useNavigation();

    async function onRegisterPressed() {
        try {
            var lowerEmail = email.toLowerCase();
            const {user, userSub} = await Auth.signUp({
                username: lowerEmail,
                password,
                attributes: {
                    email: lowerEmail,
                    phone_number: phone,
                },
            });

            navigation.navigate('Verification',
                {
                    usernameParam: lowerEmail,
                    passwordParam: password,
                });
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    };

    const onConfirmCodePress = () => {
        navigation.navigate('Verification');
    };

    const onTermsOfUsePressed = () => {
        console.warn('onTermsOfUsePressed');
    };

    const onPrivacyPressed = () => {
        console.warn('onPrivacyPressed');
    };

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
                        placeholder="Email [UserName]"
                        value={email}
                        setValue={setEmail}
                        iconCategory="Fontisto"
                        iconName="email"
                    />
                    <CustomInput
                        placeholder="Phone [Optional]"
                        value={phone}
                        setValue={setPhone}
                        iconCategory="Fontisto"
                        iconName="phone"
                    />
                    <CustomInput
                        placeholder="Password"
                        value={password}
                        setValue={setPassword}
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
                    type="TERTIARY"
                />
                <CustomButton
                    text="Verify an existing account"
                    onPress={onConfirmCodePress}
                    type="TERTIARY"
                />
            </View>
        </ScrollView>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#ffffff",
        // alignItems: "center",
        paddingBottom: 10,
        paddingTop: 20,
        paddingLeft: 50,
        paddingRight: 50,
        height: 800,
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
