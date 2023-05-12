import React, {useState} from 'react';
import {
    View,
    Image,
    ScrollView, Text,
} from 'react-native'
import {useNavigation} from "@react-navigation/native"
import styles from './styles';
import CustomButton from "../../components/CustomButton"
import jobAnim from "../../../assets/animations/104042-recolored-job-proposal-review-animation.json"
import Lottie from "lottie-react-native"
import {Auth} from "aws-amplify";
import {CognitoHostedUIIdentityProvider} from "@aws-amplify/auth"
import google from "../../../assets/images/google-logo.png"
import apple from "../../../assets/images/apple-logo.png"
import Colors from "../../constants/Colors"

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
                <View style={styles.buttonContainer}>
                    <Text style={styles.text}>
                        By registering, you confirm that you accept our{' '}Terms of Use
                    </Text>
                    <CustomButton text="Sign In" onPress={onSignInPressed} />
                    <CustomButton
                        text="Sign Up"
                        onPress={onSignUpPressed}
                        bgColor="#E3E8F1"
                        fgColor="#5B67CA"
                    />
                    <View>
                        <CustomButton
                            text="Sign In With Gmail"
                            onPress={onSignInGoogle}
                            bgColor="#FFFFFF"
                            fgColor="#5B67CA"
                            imageUrl={google}
                            imageStyle={{width: 25, height: 25}}
                            style={{
                                    borderWidth: 1,
                                    borderColor: Colors.light.tint
                                }}
                        />
                        <CustomButton
                            text="Sign In With Apple"
                            onPress={onSignInApple}
                            bgColor="#FFFFFF"
                            fgColor="#5B67CA"
                            imageUrl={apple}
                            imageStyle={{width: 25, height: 25, margin: 5}}
                            style={{
                                borderWidth: 1,
                                borderColor: Colors.light.tint
                            }}
                        />
                    </View>
                </View>
            </View>

        </ScrollView>
    );
};

