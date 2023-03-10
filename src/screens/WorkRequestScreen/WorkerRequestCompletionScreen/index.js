import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    KeyboardAvoidingView, Platform, StyleSheet, Image,
} from 'react-native'
import {useNavigation} from "@react-navigation/native";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import UserAvatar from "@muhzi/react-native-user-avatar";
import Feather from "react-native-vector-icons/Feather";
import {Storage} from "aws-amplify";
import {ProfileService} from "../../../backend/ProfileService";
import * as ImagePicker from "expo-image-picker";
import Colors from "../../../constants/Colors";
import ImageList from "../../../components/ImageList";
import Entypo from "react-native-vector-icons/Entypo";
import {TaskService} from "../../../backend/TaskService";
import loading from "../../../../assets/images/loading.gif";

export default function WorkerRequestCompletionScreen(props) {
    const requestObj = props?.route?.params

    const [profileName, setProfileName] = useState('')
    const [category, setCategory] = useState('')
    const [location, setLocation] = useState('')
    const [distance, setDistance] = useState(50)
    const [description, setDescription] = useState(50)
    const [price, setPrice] = useState(20)
    const [profileImage, setProfileImage] = useState(null)
    const [images, setImages] = useState([])
    const [dataBeingSaved, setDataBeingSaved] = useState(false)

    const navigation = useNavigation()
    const profileService = new ProfileService()
    const taskService = new TaskService()

    async function getCurrentUserData() {
        const profile = profileService.getProfile()
        if(profile && profile.name){
            setProfileName(profile.name)
        }
        if(profile && profile.location && profile.location){
            setLocation(profile.location)
        }
        if(profile && profile.photos){
            const url = await profileService.getProfileMainPhoto()
            setProfileImage(url)
        }
    }

    useEffect(() => {
        getCurrentUserData().then(r => {})
    }, [getCurrentUserData])

    const removeImage = (value) => {
        setImages(images.filter(item => item !== value))
    }

    async function onImagePickerPress() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 0.1,
        })
        const imageUri = result.assets[0].uri
        if (!result.canceled) {
            setImages([...images, imageUri])
        } else{
            return
        }
    }

    async function submitRequest() {
        requestObj.description = description
        console.log(requestObj)
        setDataBeingSaved(true)
        try{
            const response = await taskService.createTask({
                category: requestObj.category,
                description: description,
                distance: distance,
                price: price,
                priceUnit: 'hr',
                location: {
                    latitude: location.latitude,
                    longitude: location.longitude
                },
                country: 'Canada',
                stateProvince: 'ON',
                city: location.locationName,
                validTillDateTime: '2023-03-31'
            })

            images.map(async(e)=> {
                const photoRes = await taskService.addPhoto({
                    type: 'main',
                    taskId: response.id
                })
                if(!photoRes) {
                    throw new Error('Profile Photo cannot be added!')
                }
                const photoObj = await fetch(e)
                const blob = await photoObj.blob()
                const key = photoRes.key
                await Storage.put(key, blob, {
                    bucket: photoRes.bucket,
                    level: 'protected',
                    contentType: blob.type,
                    progressCallback: progress => {

                    }
                })
            })

            navigation.navigate('RequestCompletedScreen')
        } catch (e) {
            console.log(e)
        }
        setDataBeingSaved(false)
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.topContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.backButton}>
                            <FontAwesome name="chevron-left" style={styles.backIcon}/>
                            <Text style={styles.backIcon}> Back </Text>
                        </TouchableOpacity>
                    </View>

                    {
                        dataBeingSaved ?
                            <Image source={loading} style={{width: 40, height: 30}} />
                            :
                            <TouchableOpacity style={styles.submitButton} onPress={submitRequest}>
                                <Text style={styles.submitButtonText}>Submit</Text>
                            </TouchableOpacity>
                    }

                </View>
            </View>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <View style={styles.avatarReviewerContainer}>
                        <UserAvatar
                            size={35}
                            active
                            name={profileName}
                            src={profileImage}
                        />
                        <TouchableOpacity style={styles.reviewerName}>
                            <Text style={styles.reviewerText}>{profileName}</Text>
                            <Feather name="chevron-down" size={20}/>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.inputsContainer}>
                    <TextInput
                        value={description}
                        onChangeText={value => setDescription(value)}
                        multiline={true}
                        style={styles.reviewInput}
                        placeholder={"Details..."}
                    />
                </View>
                <View style={styles.imageContainer}>
                    {
                        images.map((e)=> <ImageList id={e} item={e} remove={removeImage} />)
                    }
                </View>
            </ScrollView>
            <View style={styles.imageSelectorContainer}>
                <TouchableOpacity onPress={onImagePickerPress} style={styles.pickImage}>
                    <MaterialCommunityIcons name="image-plus" style={{fontSize: 45, color: Colors.light.tint}}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.locationBar}>
                    <Entypo name="location" style={{fontSize: 30, color: Colors.light.tint}}/>
                    <Text style={styles.locationText}>{location.locationName}</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        height: '100%',
        paddingTop: 35,
    },
    headerExtensionContainer: {
        width: '100%',
        paddingHorizontal: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
    },
    headerContainer: {
        // zIndex: -1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
    },
    headerLeft: {
        flexDirection: 'row',
        paddingStart: 5,
        paddingEnd: 10,
    },
    backButton: {
        flexDirection: 'row',
        marginTop: 7,
        paddingEnd: 10,
        alignItems: 'center'
    },
    backIcon: {
        fontSize: 17,
        color: Colors.light.tint,
    },
    contactName: {
        paddingStart: 10,
        fontSize: 18,
        fontWeight: '500',
        alignSelf: 'center'
    },
    inputsContainer: {
        // backgroundColor: Colors.light.grey,
        margin: 10,
    },
    reviewInput: {
        textAlignVertical: 'top',
        height: 200,
        maxHeight: 300,
        fontSize: 20,
        margin: 5,
        padding: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
        margin: 10
    },
    imageSelectorContainer: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: Colors.light.darkerGrey,
        flexDirection: 'row',
    },
    imageContainer: {
        width: '100%',
        // height: 150,
        // flexDirection: 'row',
    },
    reviewerName: {
        marginHorizontal: 10,
        padding: 5,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: Colors.light.grey,
        borderRadius: 5,
    },
    avatarReviewerContainer: {
        flexDirection: 'row',
        marginHorizontal: 7,
        marginTop: 10,
    },
    submitButton: {
        backgroundColor: Colors.light.tint,
        borderRadius: 10,
        width: 70,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationBar: {
        marginLeft: 10,
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    submitButtonText: {
        color: '#fff'
    },
})
