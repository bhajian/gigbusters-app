import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import profileAnim from "../../../../assets/animations/67352-profile-creation-loader.json";
import Lottie from "lottie-react-native";
import {RadioButton} from "react-native-paper";
import {FontAwesome5, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import {Auth} from "aws-amplify";
import {ProfileService} from "../../../backend/ProfileService";

const CreateProfileScreen = (props) => {

    let email = ''
    let phone = ''
    const subscription = ''
    const [name, setName] = useState('');
    const [accountType, setAccountType] = useState('');
    const navigation = useNavigation();
    const profileService = new ProfileService()

    async function onNextPressed() {
        try {
            props.updateAuthState('initializing');
            const currentUser = await Auth.currentAuthenticatedUser()
            email = currentUser.attributes.email
            phone = currentUser.attributes.phone_number ?
                currentUser.attributes.phone_number : ''
            const profile = await profileService.createProfile({
                name: name,
                subscription: subscription,
                accountType: accountType,
                email: {
                    email: email,
                    verified: true
                },
                phone: {
                    phone: phone,
                    verified: false
                }
            })
            props.updateAuthState('loggedIn');
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Lottie
                    style={{height: 180, width: 180, alignSelf: 'center', margin: 5}}
                    source={profileAnim}
                    autoPlay
                    loop
                />
                <View style={styles.form}>
                    <CustomInput
                        placeholder="Full Name"
                        value={name}
                        setValue={setName}
                        iconCategory="AntDesign"
                        iconName="profile"
                    />
                    <RadioButton.Group
                        onValueChange={setAccountType}
                        value={accountType}
                    >
                        <View style={styles.radioRow}>
                            <MaterialIcons
                                style={styles.icon}
                                name={"emoji-transportation"}
                            />
                            <RadioButton.Item label="I need a worker." value="USER" style={styles.radioButton} />
                        </View>
                        <View style={styles.radioRow}>
                            <MaterialIcons
                                style={styles.icon}
                                name={"sports-handball"}
                            />
                            <RadioButton.Item label="I want to work." value="WORKER" style={styles.radioButton} />
                        </View>
                    </RadioButton.Group>
                </View>
                <CustomButton
                    text="Next"
                    style={styles.component}
                    onPress={onNextPressed}
                />

            </View>
        </ScrollView>
    );
};

export default CreateProfileScreen;

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#ffffff",
        // alignItems: "center",
        paddingBottom: 10,
        paddingTop: 20,
        paddingLeft: 50,
        paddingRight: 50,
        height: 800,
    },
    form: {
        marginTop: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
        marginBottom: 30
    },
    component: {
        marginTop: 20
    },
    radioRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    radioButton: {
        fontWeight: '500',
        width: 270,
    },
    icon: {
        fontSize: 20,
        color: Colors.light.tint
    }
});
