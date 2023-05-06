import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomButton from '../../../components/CustomButton';
import Lottie from "lottie-react-native";
import shredAnim from "../../../../assets/animations/99314-delete-files-loop.json";
import {ProfileService} from "../../../backend/ProfileService";
import {CheckBox} from "react-native-elements";
import {Auth} from "aws-amplify";
import Colors from "../../../constants/Colors";



export default function DeactivateProfileScreen({navigation, route, updateAuthState}) {
    const {phoneParam} = (route.params ? route.params : '')
    const [confirm, setConfirm] = useState(false)
    const [phone, setPhone] = useState(phoneParam)
    const profileService = new ProfileService()

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            headerLargeTitle: false,
            headerLeftContainerStyle: {
                left: 10,
            },
            headerTitle: () => (
                <Text style={{fontWeight: 'bold'}}>Deactivate Your Profile</Text>
            ),
            headerTintColor: Colors.light.tint
        })
    }, [])

    async function deactivateAccount() {
        if(confirm){
            try {
                await profileService.deactivateProfile()
                await Auth.signOut({global: true})
                updateAuthState('loggedOut')
            } catch (error) {
                console.log(error)
            }
        } else{
            Alert.alert('Please turn the checkbox on if you want to deactivate your account.')
        }

    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Lottie
                    style={{height: 180, width: 180, alignSelf: 'center', margin: 5}}
                    source={shredAnim}
                    autoPlay
                    loop
                />
                <View style={styles.form}>
                    <CheckBox
                        checked={confirm}
                        onPress={() => setConfirm(!confirm)}
                        style={styles.checkbox}
                    />
                    <Text style={styles.text}>
                        You are about to delete your account. By Checking this box I confirm that my account to be deleted.
                    </Text>
                </View>
                <CustomButton
                    text="Deactivate My Account"
                    onPress={deactivateAccount}
                    style={styles.component}
                />
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
    form: {
        marginTop: 15,
        flexDirection: 'row',
    },
    component: {
        marginTop: 20
    },
    title: {
        marginTop: 20,
        paddingBottom: 90,
        fontSize: 40,
        color: "#ff6200"
    },
    link: {
        color: "#ff6200"
    },
    text: {
        marginTop: 20,
        marginRight: 50
    },
    registerButton: {
        marginTop: 40,
    },
    checkbox: {
        justifyContent: 'center'
    },
});
