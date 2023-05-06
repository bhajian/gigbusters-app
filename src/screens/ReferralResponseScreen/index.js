import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {Auth} from 'aws-amplify';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import jobAnim from "../../../assets/animations/5673-referral.json";
import Lottie from "lottie-react-native";
import Colors from "../../constants/Colors";
import UserAvatar from "@muhzi/react-native-user-avatar";

export default function ReferralResponseScreen({navigation, route}) {
    const {request} = (route.params ? route.params : '')
    const [email, setEmail] = useState(request);

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            headerLargeTitle: false,
            headerLeftContainerStyle: {
                left: 10,
            },
            headerTitle: () => (
                <Text style={{fontWeight: 'bold'}}>Make a Referral</Text>
            ),
            headerTintColor: Colors.light.tint
        })
    }, [])


    async function referralSubmission() {
        try {

        } catch (error) {

        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <View style={styles.topContainer}>
                    <View style={styles.customerContainer}>
                        <UserAvatar
                            size={40}
                            userName={request.name}
                            style={styles.avatar}
                            src={request.profilePhotoURL}
                            backgroundColor={Colors.light.turquoise}
                            fontSize={25}
                        />
                        <View style={styles.mainContainer}>
                            <View>
                                <Text style={styles.toName} >{request.name}</Text>
                            </View>
                            <View style={styles.userIdContainer}>
                                <Text style={styles.fromName}>ID: {request.accountCode}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.taskContainer}>
                    <View style={styles.infoContainer}>
                        <View style={styles.info}>
                            <Text style={styles.text} >{request?.location?.locationName}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.text} >{request?.price}$/{request?.priceUnit}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.text} >{request?.category}</Text>
                        </View>
                    </View>

                    <View style={styles.mainContainer}>
                        <Text style={styles.text} >{request?.description}</Text>
                        {!!request.photos && <Image source={{uri: request?.mainPhotoURL}} style={styles.image} />}
                    </View>
                </View>

                <Text style={styles.text}>
                    Share the worker's Email or Phone number. Someone you know who this task and gain points.
                </Text>
                <CustomInput
                    placeholder="Email"
                    // value={email}
                    // setValue={setEmail}
                    iconCategory="Fontisto"
                    iconName="email"
                />
                <CustomInput
                    placeholder="Phone Number"
                    // value={phone}
                    // setValue={setPhone}
                    iconCategory="Fontisto"
                    iconName="email"
                />
                <CustomButton
                    text="Make a Referral"
                    onPress={referralSubmission}
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
        paddingLeft: 20,
        paddingRight: 20,
        height: 800,
    },
    topContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    customerContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    mainContainer:{
        marginLeft: 10
    },
    component: {
        marginTop: 20
    },
    title: {
        marginTop: 20,
        paddingBottom: 90,
        // textAlign: "justify",
        fontSize: 40,
        color: "#ff6200"
    },
    link: {
        color: "#ff6200"
    },
    registerButton: {
        marginTop: 40,
    },
    taskContainer: {
        // width: '100%',
    },
    ratingStackContainer: {
        width: '90%'
    },
    infoContainer: {
        width: '100%',
        flexDirection: 'row',
    },
    info: {
        marginTop: 5,
        borderRadius: 50,
        backgroundColor: Colors.light.grey,
        marginHorizontal: 2
    },
    text: {
        paddingHorizontal: 4,
        paddingVertical: 4,
        marginHorizontal: 4,
        marginTop: 1,
        marginBottom: 2,
        color: '#000',
    },
    image: {
        marginVertical: 10,
        width: "100%",
        height: 150,
        resizeMode: 'cover',
        borderRadius: 15,
        overflow: 'hidden',
    }
});
