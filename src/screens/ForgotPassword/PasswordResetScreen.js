import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Auth} from 'aws-amplify';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

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
            console.log(
                '❌ Verification code does not match. Please enter a valid verification code.',
                error.code,
            );
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
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
