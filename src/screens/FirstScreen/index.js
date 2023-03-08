import React, {useState} from 'react';
import {
    View,
    Image,
    ScrollView, Text,
} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import Logo from '../../../assets/images/gossip.jpeg';
import styles from './styles';
import CustomButton from "../../components/CustomButton";
import jobAnim from "../../../assets/animations/104042-recolored-job-proposal-review-animation.json";
import Lottie from "lottie-react-native";

export default function FirstScreen() {

    const navigation = useNavigation();

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }

    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    };


    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: "#ffffff"}}>
            <View style={styles.root}>
                <Lottie
                    style={{height: 400, width: 400, alignSelf: 'center', marginTop: 5}}
                    source={jobAnim}
                    autoPlay
                    loop
                />
                <Text style={styles.textLogo}> Gig Buster </Text>
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
                </View>
            </View>

        </ScrollView>
    );
};

