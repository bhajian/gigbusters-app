import React, {useState} from 'react';
import {
    View,
    Image,
    ScrollView, Text, StyleSheet, Linking,
} from 'react-native'
import {useNavigation} from "@react-navigation/native"
import CustomButton from "../../components/CustomButton"
import jobAnim from "../../../assets/animations/104042-recolored-job-proposal-review-animation.json"
import Lottie from "lottie-react-native"
import {Auth} from "aws-amplify";
import {CognitoHostedUIIdentityProvider} from "@aws-amplify/auth"
import google from "../../../assets/images/google-logo.png"
import apple from "../../../assets/images/apple-logo.png"
import Colors from "../../constants/Colors"
import App from "../../../app.json"

export default function FirstScreen() {

    const navigation = useNavigation()

    const onSignInPressed = () => {
        navigation.navigate('SignIn')
    }

    const onSignUpPressed = () => {
        navigation.navigate('SignUp')
    }

    const onSignInGoogle = async () => {
        try{
            await Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google,})
        } catch (e) {
            alert(e)
        }
    }

    const onSignInApple = async () => {
        try{
            await Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Apple,})
        } catch (e) {
            alert(e)
        }
    }

    const onTermsOfUsePressed = async () => {
        await Linking.openURL('https://gigbusters.app/?page_id=3')
    }

    const onPrivacyPressed = async() => {
        await Linking.openURL('https://gigbusters.app/?page_id=1045')
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: "#ffffff"}}>
            <View style={styles.root}>
                <Lottie
                    style={{height: 300, width: 300, alignSelf: 'center', marginTop: 5}}
                    source={jobAnim}
                    autoPlay
                    loop
                />
                <Text style={styles.textLogo}> Gig Busters </Text>
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
                <View style={styles.buttonContainer}>
                    <CustomButton text="Sign In" onPress={onSignInPressed} />
                    <CustomButton
                        text="Sign Up"
                        onPress={onSignUpPressed}
                        bgColor="#E3E8F1"
                        fgColor="#5B67CA"
                    />
                    <View style={styles.doubleButtonContainer}>
                        <CustomButton
                            text="Sign In With"
                            onPress={onSignInGoogle}
                            bgColor="#FFFFFF"
                            fgColor="#5B67CA"
                            imageUrl={google}
                            imageStyle={{width: 25, height: 25}}
                            style={[styles.doubleBotton, {
                                borderWidth: 1,
                                borderColor: Colors.light.tint
                            }]}
                        />
                        <CustomButton
                            text="Sign In With"
                            onPress={onSignInApple}
                            bgColor="#FFFFFF"
                            fgColor="#5B67CA"
                            imageUrl={apple}
                            imageStyle={{width: 25, height: 25, margin: 5}}
                            style={[styles.doubleBotton, {
                                borderWidth: 1,
                                borderColor: Colors.light.tint
                            }]}
                        />
                    </View>
                </View>
                <Text style={styles.versionText}> Version: {App.expo.version} </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#ffffff",
        alignItems: "stretch",
        marginHorizontal: 30
    },
    doubleButtonContainer: {
        backgroundColor: "#fff",
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    buttonContainer: {
        backgroundColor: "#ffffff",
        marginTop: 20,
    },
    logo: {
        width: '100%',
        height: 500,
    },
    link: {
        color: "#ff6200"
    },
    text:{
        textAlign: "center",
    },
    versionText: {
        textAlign: "center",
        marginTop: 20,
    },
    textLogo: {
        textAlign: "center",
        fontSize: 41,
        color: "#5B67CA"
    },
    doubleBotton: {
        width: '48%',
        marginTop: 10,
    }
})
