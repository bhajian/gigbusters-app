import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Auth} from 'aws-amplify';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import jobAnim from "../../../assets/animations/107800-login-leady.json";
import Lottie from "lottie-react-native";
import Colors from "../../constants/Colors";

export default function ForgetPasswordScreen({navigation, route}) {
    const {emailParam} = (route.params ? route.params : '');
    const [email, setEmail] = useState(emailParam);

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            headerLargeTitle: false,
            headerLeftContainerStyle: {
                left: 10,
            },
            headerTitle: () => (
                <Text style={{fontWeight: 'bold'}}> Forgot Password</Text>
            ),
            headerTintColor: Colors.light.tint
        })
    }, [])


    async function confirmSignUp() {
        try {
            var lowerEmail = email.toLowerCase()
            await Auth.forgotPassword(lowerEmail)
            navigation.navigate('PasswordResetScreen',
                {
                    emailParam: lowerEmail,
                });
        } catch (error) {
            console.log(
                '❌ VerificationScreen code does not match. Please enter a valid verification code.',
                error.code,
            );
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
                <Text style={styles.title}>Forgot Password</Text>
                <View style={styles.formContainer}>
                    <CustomInput
                        placeholder="Email"
                        value={email}
                        setValue={setEmail}
                        iconCategory="Fontisto"
                        iconName="email"
                    />
                    <CustomButton
                        text="Verify Email"
                        onPress={confirmSignUp}
                        style={styles.component}
                    />
                    <Text style={styles.text}>
                        Please check your email, shortly you will receive a code in your email.
                    </Text>
                </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#ffffff",
        paddingBottom: 10,
        paddingTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        height: 800,
    },
    component: {
        marginTop: 20
    },
    title: {
        marginTop: 30,
        fontSize: 40,
        color: Colors.light.tint,
        textAlign: 'center'
    },
    formContainer: {
        marginTop: 30
    },
    link: {
        color: Colors.light.tint
    },
    text: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16
    },
    registerButton: {
        marginTop: 40,
    },
});
