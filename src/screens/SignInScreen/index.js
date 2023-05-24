import React, {useEffect, useState} from 'react';
import {
    View,
    Image,
    useWindowDimensions,
    ScrollView,
    Text,
    Alert,
    Pressable,
    StyleSheet,
    Platform,
    KeyboardAvoidingView
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {Auth} from 'aws-amplify';
import jobAnim from "../../../assets/animations/104042-recolored-job-proposal-review-animation.json";
import Lottie from "lottie-react-native";
import {ProfileService} from "../../backend/ProfileService";
import Colors from "../../constants/Colors";

export default function SignInScreen(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const profileService = new ProfileService()

    const {height} = useWindowDimensions()
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            headerLargeTitle: false,
            headerLeftContainerStyle: {
                left: 10,
            },
            headerTitle: () => (
                <Text style={{fontWeight: 'bold'}}> Sign In</Text>
            ),
            headerTintColor: Colors.light.tint
        })
    }, [])

    async function onSignInPressed() {
        try {
            props.updateAuthState('initializing')
            var lowerEmail = username.toLowerCase()
            const user = await Auth.signIn(lowerEmail, password)
            const profile = await profileService.fetchProfile({userId: user.sub})
            if(profile && profile.userId){
                props.updateAuthState('loggedIn');
            } else {
                props.updateAuthState('profileCreation');
            }
        } catch (error) {
            props.updateAuthState('loggedOut');
            if(error.name !== 'InvalidParameterException'){
                alert(error.message)
            } else{
                alert('Sorry Something went wrong or something is missing.')
            }
        }
    }

    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword')
    };

    const onSignUpPress = () => {
        navigation.navigate('SignUp');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 70 : 70}
            style={styles.root}
        >
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View style={styles.container}>
                    <Lottie
                        style={{height: 200, width: 250, alignSelf: 'center', marginTop: 5}}
                        source={jobAnim}
                        autoPlay
                        loop
                    />
                    <CustomInput
                        style={styles.components}
                        placeholder="Username"
                        iconCategory="Fontisto"
                        iconName="email"
                        value={username}
                        setValue={setUsername}
                    />
                    <CustomInput
                        placeholder="Password"
                        value={password}
                        iconCategory="FontAwesome5"
                        iconName="key"
                        setValue={setPassword}
                        secureTextEntry
                    />
                    <CustomButton
                        text="Sign In"
                        onPress={onSignInPressed}
                        style={styles.components}
                    />
                    <CustomButton
                        text="Forgot password?"
                        onPress={onForgotPasswordPressed}
                        type="TERTIARY"
                    />
                    <View style={styles.components}>
                        <SocialSignInButtons/>

                        <CustomButton
                            text="Don't have an account? Sign Up"
                            onPress={onSignUpPress}
                            type="SECONDARY"
                            style={styles.components}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

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
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    components: {
        width: '100%',
        marginTop: 15,
    },
    socialButtons: {
        marginTop: 10
    },
    signupButton: {
        marginTop: 10
    },
})
