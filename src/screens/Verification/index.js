import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Auth} from 'aws-amplify';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import styles from './styles';

export default function ConfirmSignUp({navigation, route}) {
    const {usernameParam} = (route.params ? route.params : '');
    const [authCode, setAuthCode] = useState('');
    const [username, setUsername] = useState(usernameParam);

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
            // await Auth.confirmSignUp(username, authCode);
            console.log('✅ Code confirmed');
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
                <Text style={styles.title}>Verification</Text>
                <CustomInput
                    placeholder="Email"
                    value={username}
                    setValue={setUsername}
                    iconCategory="Fontisto"
                    iconName="email"
                />
                <CustomInput
                    placeholder="Code"
                    value={authCode}
                    setValue={setAuthCode}
                    iconCategory="Fontisto"
                    iconName="email"
                />
                <CustomButton
                    text="Confirm Code"
                    onPress={confirmSignUp}
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
    );
}
