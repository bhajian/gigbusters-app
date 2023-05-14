import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, KeyboardAvoidingView, Platform} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Colors from "../../constants/Colors";
import UserAvatar from "@muhzi/react-native-user-avatar";
import Fontisto from "react-native-vector-icons/Fontisto";
import PhoneInput from "react-phone-number-input/react-native-input";
import {TaskService} from "../../backend/TaskService";
import {MessageService} from "../../backend/MessageService";
import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";
import {ProfileService} from "../../backend/ProfileService";
import loading from "../../../assets/images/loading2.gif";

export default function ReferralResponseScreen({navigation, route}) {
    const taskService = new TaskService()
    const messageService = new MessageService()
    const profileService = new ProfileService()
    const ref = useRef()

    const {request} = (route.params ? route.params : '')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [referredName, setReferredName] = useState('')
    const [dataBeingSaved, setDataBeingSaved] = useState(false)

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
        try{
            setDataBeingSaved(true)
            const profile = profileService.getProfile()
            const transaction = await taskService.createTransaction({
                type: 'referral',
                taskId: request.id,
                customerId: request.userId
            })
            const messageRes = await messageService.createReferralMessage({
                transactionId: transaction?.id,
                fromUserId: profile?.userId,
                toUserId: request.userId,
                type: 'referral',
                status: 'initiated',
                dateTime: (new Date()).toISOString(),
                referredName: referredName,
                referredEmail: email,
                referredPhone: phone
            })
            navigation.goBack()
        } catch (e) {
            console.log(e)
        }
        setDataBeingSaved(false)
    }

    async function shareTaskPressed() {
        ref.current.capture().then(uri => {
            Sharing.shareAsync(`file://${uri}`, {
                dialogTitle: 'Share to social media',
            })
        })
    }

    return (
        <KeyboardAvoidingView
            behavior='position'
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
            <ScrollView>
            <View style={styles.root}>
                <ViewShot ref={ref} options={{ fileName: "Your-File-Name", format: "jpg", quality: 0.9 }}>
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
                </ViewShot>

                <Text style={styles.text}>
                    Refer a gigbuster or share with someone who is interested in this task.
                </Text>
                <CustomInput
                    placeholder="Name [Optional]"
                    value={referredName}
                    setValue={setReferredName}
                    iconCategory="FontAwesome"
                    iconName="user"
                />
                <CustomInput
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                    iconCategory="Fontisto"
                    iconName="email"
                />
                <View style={styles.phoneContainer}>
                    <Fontisto style={styles.phoneIcon} name='phone' />
                    <PhoneInput
                        style={styles.phoneInput}
                        countrySelectProps={{ unicodeFlags: true }}
                        defaultCountry={"CA"}
                        value={phone}
                        onChange={setPhone}
                        placeholder="Phone Number"
                    />
                </View>
                {
                    dataBeingSaved ?
                        <Image source={loading} style={{width: 30, height: 30, alignSelf: 'center'}} />
                        :
                        <CustomButton
                            text="Make a Referral"
                            onPress={referralSubmission}
                            style={styles.component}
                            disabled={dataBeingSaved}
                        />
                }
                <CustomButton
                    text="Share the task"
                    onPress={shareTaskPressed}
                    style={styles.component}
                    type="FORTHSTYLE"
                />
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
        paddingLeft: 20,
        paddingRight: 20,
        height: 700,
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
        marginTop: 10
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
        color: '#065a98',
    },
    image: {
        marginVertical: 10,
        width: "100%",
        height: 200,
        resizeMode: 'cover',
        borderRadius: 15,
        overflow: 'hidden',
    }
});
