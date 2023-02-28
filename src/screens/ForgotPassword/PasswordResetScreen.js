import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {Auth} from 'aws-amplify';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import jobAnim from "../../../assets/animations/107800-login-leady.json";
import Lottie from "lottie-react-native";

export default function PasswordResetScreen({navigation, route}) {
    const {emailParam} = (route.params ? route.params : '');
    const [authCode, setAuthCode] = useState('');
    const [email, setEmail] = useState(emailParam);
    const [password, setPassword] = useState('');

    async function resendConfirmationCode() {
        try {
            // await Auth.resendSignUp(username);
            console.log('code resent successfully');
        } catch (err) {
            console.log('error resending code: ', err);
        }
    }

    const onBackToSignUpPress = () => {
        navigation.navigate('SignUp');
    };

    async function confirmSignUp() {
        try {
            var lowerEmail = email.toLowerCase();
            await Auth.forgotPasswordSubmit(lowerEmail, authCode, password);
            navigation.navigate('SignIn');
        } catch (error) {
            Alert.alert(error.message)
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
                <Text style={styles.title}>Forget Password</Text>
                <CustomInput
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                    iconCategory="Fontisto"
                    iconName="email"
                    editable={ false }
                />
                <CustomInput
                    placeholder="Code"
                    value={authCode}
                    setValue={setAuthCode}
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
                <CustomButton
                    text="Reset Password"
                    onPress={confirmSignUp}
                    style={styles.component}
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
