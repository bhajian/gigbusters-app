import React, {useEffect, useState} from 'react';
import {
    View,
    ScrollView, Text, StyleSheet,
} from 'react-native'
import {useNavigation} from "@react-navigation/native"
import CustomButton from "../../../components/CustomButton"
import workerAnim from "../../../../assets/animations/104042-recolored-job-proposal-review-animation.json"
import customerAnim from "../../../../assets/animations/91173-customer-review.json"
import Lottie from "lottie-react-native"
import Colors from "../../../constants/Colors";
import {ProfileService} from "../../../backend/ProfileService";

export default function SwitchRoleScreen(props) {

    const navigation = useNavigation()
    const profileService = new ProfileService()
    const [accountType, setAccountType] = useState(props?.route?.params?.accountType)

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

    const onSwitchRolePressed = async() => {
        try{
            props.updateAuthState('initializing')
            const profile = profileService.getProfile()
            if(accountType === 'WORKER'){
                profile.accountType = 'CONSUMER'
            } else{
                profile.accountType = 'WORKER'
            }
            setAccountType(profile.accountType)
            await profileService.updateProfile(profile)
            props.updateAccountType(profile.accountType)
            props.updateAuthState('loggedIn')
        } catch (e) {
            console.log(e)
        }
    }

    function previousRole(){
        if(accountType === 'CONSUMER'){
            return 'customer'
        }
        if(accountType === 'WORKER'){
            return 'worker'
        }
    }

    function newRole(){
        if(accountType === 'CONSUMER'){
            return 'worker'
        }
        if(accountType === 'WORKER'){
            return 'customer'
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: "#ffffff", height: '100%'}}>
            <View style={styles.root}>
                <Lottie
                    style={{height: 300, width: 300, alignSelf: 'center', marginTop: 5}}
                    source={(accountType === 'CONSUMER'? workerAnim : customerAnim)}
                    autoPlay
                    loop
                />
                <Text style={styles.text}>
                    You are about to change your role from {previousRole()} to {newRole()}
                </Text>
                <View style={styles.buttonContainer}>
                    <CustomButton text="Cancel"
                          onPress={()=> navigation.goBack()}
                        style={styles.closeBotton}
                    />
                    <CustomButton text="Confirm"
                        onPress={onSwitchRolePressed}
                        style={styles.closeBotton}
                        bgColor={Colors.light.turquoise}
                    />
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
        marginTop: 50,
        backgroundColor: "#ffffff",
        margin: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%'
    },
    logo: {
        width: '100%',
        height: 500,
    },
    text:{
        marginTop: 20,
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
        width: '48%',
        marginTop: 10,
    }
})


