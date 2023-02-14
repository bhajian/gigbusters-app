import React, {useState} from 'react';
import {View, Image, useWindowDimensions, ScrollView, Text, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {Auth} from 'aws-amplify';
import jobAnim from "../../../assets/animations/104042-recolored-job-proposal-review-animation.json";
import Lottie from "lottie-react-native";
import {ProfileService} from "../../backend/ProfileService";

function SignInScreen(props) {
    const [username, setUsername] = useState('b.hajian@gmail.com');
    const [password, setPassword] = useState('Be200513!');
    const profileService = new ProfileService()

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    async function onSignInPressed() {
        try {
            props.updateAuthState('initializing');
            const user = await Auth.signIn(username, password)
            const profiles = await profileService.pullProfiles()
            if(profiles.length > 0){
                props.updateAuthState('loggedIn');
            } else {
                props.updateAuthState('profileCreation');
            }
        } catch (error) {
            if(error.name !== 'InvalidParameterException'){
                Alert.alert(error.message)
            } else{
                Alert.alert('Sorry Something went wrong or something is missing.')
            }
        }
    }

    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword');
    };

    const onSignUpPress = () => {
        navigation.navigate('SignUp');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={true}>
            <View style={styles.root}>
                <Lottie
                    style={{height: 200, width: 200, alignSelf: 'center', marginTop: 5}}
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
                        type="TERTIARY"
                        style={styles.components}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

export default SignInScreen;
