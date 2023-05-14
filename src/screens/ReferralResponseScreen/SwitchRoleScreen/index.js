import React, {useEffect, useState} from 'react';
import {
    View,
    ScrollView, Text, StyleSheet,
} from 'react-native'
import {useNavigation} from "@react-navigation/native"
import CustomButton from "../../../components/CustomButton"
import jobAnim from "../../../../assets/animations/5673-referral.json"
import Lottie from "lottie-react-native"
import Colors from "../../../constants/Colors";

export default function SwitchRoleScreen() {

    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            headerLargeTitle: false,
            headerLeftContainerStyle: {
                left: 10,
            },
            headerTitle: () => (
                <Text style={{fontWeight: 'bold'}}>Switch Role</Text>
            ),
            headerTintColor: Colors.light.tint
        })
    }, [])


    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: "#ffffff"}}>
            <View style={styles.root}>
                <Lottie
                    style={{height: 300, width: 300, alignSelf: 'center', marginTop: 5}}
                    source={jobAnim}
                    autoPlay
                    loop
                />
                <Text style={styles.text}>
                    Thank you for referring a new Gig buster to your neighbour.
                </Text>
                <Text style={styles.textLogo}> Gig Busters </Text>
                <View style={styles.buttonContainer}>
                    <CustomButton text="Close"
                          // onPress={onSignInPressed}
                        style={styles.closeBotton}
                    />
                    {/*<CustomButton*/}
                    {/*    text="Sign Up"*/}
                    {/*    // onPress={onSignUpPressed}*/}
                    {/*    bgColor="#E3E8F1"*/}
                    {/*    fgColor="#5B67CA"*/}
                    {/*/>*/}

                </View>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#ffffff",
        alignItems: "stretch",
    },
    buttonContainer: {
        backgroundColor: "#ffffff",
        margin: 30
    },
    logo: {
        width: '100%',
        height: 500,
    },
    text:{
        textAlign: "center",
        marginHorizontal: 30,
        fontSize: 20
    },
    textLogo: {
        textAlign: "center",
        fontSize: 41,
        color: "#5B67CA"
    },
    closeBotton: {
        marginTop: 10,
    }
})


