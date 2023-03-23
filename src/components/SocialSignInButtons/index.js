import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {FontAwesome5} from "@expo/vector-icons";
import {Auth} from "aws-amplify"
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'

const SocialSignInButtons = () => {
    const onSignInFacebook = () => {
        console.warn('onSignInFacebook');
    }

    const onSignInGoogle = async () => {
        try{
            await Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google,})
        } catch (e) {
            console.log(e)
        }

    }

    const onSignInApple = () => {
        console.warn('onSignInApple');
    }

    return (
        <>
            <View style={styles.login_social_separator}>
                <View style={styles.login_social_separator_line}/>
                <Text style={styles.login_social_separator_text}>{'or'}</Text>
                <View style={styles.login_social_separator_line}/>
            </View>

            <View style={styles.login_social_buttons}>
                <Pressable
                    onPress={onSignInFacebook}
                    style={styles.FB_container}>
                    <FontAwesome5
                        style={styles.icon}
                        name={"facebook"}
                    />
                </Pressable>

                <Pressable
                    onPress={onSignInGoogle}
                    style={styles.GOOG_container}>
                    <FontAwesome5
                        style={styles.icon}
                        name={"google"}
                    />
                </Pressable>
                <Pressable
                    onPress={onSignInFacebook}
                    style={styles.APPL_container}>
                    <FontAwesome5
                        style={styles.icon}
                        name={"apple"}
                    />
                </Pressable>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    FB_container: {
        width: 45,
        marginVertical: 5,
        marginHorizontal: 2,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 45,
        justifyContent: 'center',
        backgroundColor: '#4f75f5',
    },
    GOOG_container: {
        width: 45,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 2,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 45,
        justifyContent: 'center',
        backgroundColor: 'rgba(234,49,43,0.83)',
    },
    APPL_container: {
        width: 45,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 2,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 45,
        justifyContent: 'center',
        backgroundColor: 'rgba(114,113,113,0.65)',
    },
    icon: {
        padding: 0,
        color: '#ffffff',
        fontSize: 26,
    },
    login_social_separator: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    login_social_separator_line: {
        flex: 1,
        width: '100%',
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    login_social_separator_text: {
        marginHorizontal: 10,
        color: '#808080',
        fontSize: 16,
    },
    login_social_buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },
});

export default SocialSignInButtons;
