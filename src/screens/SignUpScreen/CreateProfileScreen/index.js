import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, TextInput} from 'react-native';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import profileAnim from "../../../../assets/animations/67352-profile-creation-loader.json";
import Lottie from "lottie-react-native";
import {RadioButton} from "react-native-paper";
import {MaterialIcons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import {Auth} from "aws-amplify";
import PhoneInput from "react-phone-number-input/react-native-input";
import Fontisto from "react-native-vector-icons/Fontisto";

const CreateProfileScreen = (props) => {

    let email = ''
    const subscription = ''
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [accountType, setAccountType] = useState('CONSUMER')
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            headerLargeTitle: false,
            headerLeftContainerStyle: {
                left: 10,
            },
            headerTitle: () => (
                <Text style={{fontWeight: 'bold'}}>Create a Profile</Text>
            ),
            headerTintColor: Colors.light.tint
        })
    }, [])

    async function onNextPressed() {
        try {
            if(!accountType ){
                throw new Error('Please Select Account Type')
            }
            if(!name ){
                throw new Error('Name is required')
            }

            const currentUser = await Auth.currentAuthenticatedUser()
            email = currentUser.attributes.email

            navigation.navigate('CompleteProfileScreen',
                {
                    name: name,
                    subscription: subscription,
                    accountType: accountType,
                    email: email,
                    phone: phone,
                })

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
                    <View style={styles.phoneContainer}>
                        <Fontisto style={styles.phoneIcon} name='phone' />
                        <PhoneInput
                            style={styles.phoneInput}
                            countrySelectProps={{ unicodeFlags: true }}
                            defaultCountry={"CA"}
                            value={phone}
                            onChange={setPhone}
                            placeholder="Phone [Optional]"
                        />
                    </View>
                    <RadioButton.Group
                        onValueChange={setAccountType}
                        value={accountType}
                    >
                        <View style={styles.radioRow}>
                            <MaterialIcons
                                style={styles.icon}
                                name={"emoji-transportation"}
                            />
                            <RadioButton.Item label="I need a Service Provider." value="CONSUMER" style={styles.radioButton} />
                        </View>
                        <View style={styles.radioRow}>
                            <MaterialIcons
                                style={styles.icon}
                                name={"sports-handball"}
                            />
                            <RadioButton.Item label="I Provide a Service." value="WORKER" style={styles.radioButton} />
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
        paddingLeft: 25,
        paddingRight: 25,
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
    phoneContainer: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5,
        flexDirection: 'row',
    },
    phoneIcon: {
        padding: 0,
        color: '#b8b8b8',
        fontSize: 20,
    },
    phoneInput: {
        flex: 1,
        paddingLeft: 5,
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
