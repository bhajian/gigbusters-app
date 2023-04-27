import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    KeyboardAvoidingView, Platform, StyleSheet, Image, Pressable, Keyboard,
} from 'react-native'
import {useNavigation} from "@react-navigation/native";
import {Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import UserAvatar from "@muhzi/react-native-user-avatar";
import Feather from "react-native-vector-icons/Feather";
import {ProfileService} from "../../../backend/ProfileService";
import * as ImagePicker from "expo-image-picker";
import Colors from "../../../constants/Colors";
import ImageList from "../../../components/ImageList";
import Entypo from "react-native-vector-icons/Entypo";
import {TaskService} from "../../../backend/TaskService";
import loading from "../../../../assets/images/loading2.gif";
import GigRequestBottomSheet from "../RequestGigBottomSheet";
import Fontisto from "react-native-vector-icons/Fontisto";

export default function RequestGigScreen(props) {
    const params = props?.route?.params
    const operation = (params?.operation ? params?.operation : 'create')

    const [isKeyboardVisible, setKeyboardVisible] = useState(false)
    const [profileName, setProfileName] = useState('')
    const [category, setCategory] = useState((operation === 'edit' ?
            params?.task?.category :
            ''
    ))
    const [location, setLocation] = useState((operation === 'edit' ?
            params?.task?.location :
            ''
    ))
    const [distance, setDistance] = useState([50])
    const [description, setDescription] = useState((operation === 'edit' ?
            params?.task?.description :
            ''
    ))
    const [price, setPrice] = useState((operation === 'edit' ?
            [params?.task?.price] :
            [20]
    ))
    const [priceUnit, setPriceUnit] = useState((operation === 'edit' ?
            params?.task?.priceUnit :
            'hr'
    ))
    const [profileImage, setProfileImage] = useState(null)
    const [images, setImages] = useState((operation === 'edit' ?
        (params?.task?.mainPhotoURL? [params?.task?.mainPhotoURL] : []) :
            []
    ))
    const [photos, setPhotos] = useState((operation === 'edit' ?
            params?.task?.photos :
            []
    ))
    const [dataBeingSaved, setDataBeingSaved] = useState(false)

    const navigation = useNavigation()
    const taskService = new TaskService()
    const profileService = new ProfileService()
    const bottomSheetModalRef = useRef(null)
    const handleSheetChanges = useCallback((value) => {
    }, [])
    const inputTestRef = useRef()

    async function loadData() {
        const profile = profileService.getProfile()
        if(profile && profile.name){
            setProfileName(profile.name)
        }
        if(profile && profile.location && profile.location){
            setLocation(profile.location)
        }
        if(profile && profile.photos){
            const url = profile.mainPhotoUrl
            setProfileImage(url)
        }
    }

    useEffect(() => {
        if(params?.operation === 'create'){
            Keyboard.dismiss()
            bottomSheetModalRef.current.present()
        }
        loadData().catch((e) => console.log(e))
    }, [])

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            headerLargeTitle: false,
            tabBarIcon: ({color}) => (
                <Fontisto name="home" size={25} color={color}/>
            ),
            headerTitle: () => (
                <Text> Request a gig</Text>
            ),
            headerRight: () => (
                dataBeingSaved ?
                    <Image source={loading} style={{width: 30, height: 30}} />
                    :
                    <TouchableOpacity style={styles.submitButton} onPress={submitRequest}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
            ),
            headerTintColor: Colors.light.tint
        })

        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true)
            },
        )
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false)
            },
        )

        return () => {
            keyboardDidHideListener.remove()
            keyboardDidShowListener.remove()
        }

    }, [navigation, submitRequest, dataBeingSaved])

    const removeImage = (value) => {
        setImages(images.filter(item => item !== value))
    }

    async function onImagePickerPress() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [3, 3],
            quality: 0.1,
        })
        const imageUri = result?.assets[0]?.uri
        if (!result.canceled) {
            setImages([...images, imageUri])
        }
    }

    async function onDetailPress() {
        Keyboard.dismiss()
        bottomSheetModalRef.current.present()
    }

    async function onAnythingElsePress() {
        Keyboard.dismiss()
    }

    const getValueFromBottomSheet = (props) => {
        setCategory(props.category)
        setPrice(props.price)
        setDistance(props.distance)
        setLocation(props.location)
        inputTestRef?.current?.focus()
    }

    async function submitRequest() {
        setDataBeingSaved(true)
        try{
            if(params?.operation === 'create') {
                await taskService.createTask({
                    category: category,
                    description: description,
                    distance: distance,
                    price: price,
                    priceUnit: priceUnit,
                    location: {
                        latitude: location.latitude,
                        longitude: location.longitude,
                        locationName: location.locationName,
                    },
                    city: location.locationName,
                    images: images
                })
            }
            if(params?.operation === 'edit') {
                await taskService.updateTask({
                    id: params?.task?.id,
                    category: category,
                    description: description,
                    distance: distance,
                    price: price,
                    priceUnit: priceUnit,
                    location: {
                        latitude: location.latitude,
                        longitude: location.longitude
                    },
                    city: location.locationName,
                    photos: photos,
                    images: images
                })
            }
            navigation.navigate('RequestCompletedScreen')
        } catch (e) {
            console.log(e)
        }
        setDataBeingSaved(false)
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 155}
            style={styles.container}
        >
            <ScrollView keyboardShouldPersistTaps="always">
                <View style={styles.topContainer}>
                    <View style={styles.avatarReviewerContainer}>
                        <UserAvatar
                            size={35}
                            active
                            name={profileName}
                            src={profileImage}
                        />
                        <View style={styles.taskOwnerName} onPress={onAnythingElsePress}>
                            <Text style={styles.reviewerText}>{profileName}</Text>
                            <Feather name="chevron-down" size={20}/>
                        </View>
                    </View>
                    <View style={styles.detailTopContainer}>
                        <TouchableOpacity onPress={onImagePickerPress} style={styles.detailTopButton}>
                            <MaterialCommunityIcons name="image-plus" style={{fontSize: 35, color: Colors.light.tint}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onDetailPress} style={styles.detailTopButton}>
                            <MaterialIcons name="category" style={{fontSize: 30, color: Colors.light.tint}}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.tagsContainer}>
                    <View style={styles.tag}>
                        <Text style={styles.text} >{location.locationName}</Text>
                    </View>
                    <View style={styles.tag}>
                        <Text style={styles.text} >{price}$/hr</Text>
                    </View>
                    <View style={styles.tag}>
                        <Text style={styles.text} >{category}</Text>
                    </View>
                </View>
                <View style={styles.inputsContainer}>
                    <TextInput
                        value={description}
                        onChangeText={value => setDescription(value)}
                        multiline={true}
                        style={styles.reviewInput}
                        placeholder={"Details..."}
                        ref={inputTestRef}
                    />
                </View>

                <View style={styles.topContainer}>
                    {
                        images?.map((e)=> <ImageList key={e?.toString()} item={e} remove={removeImage} />)
                    }
                </View>
            </ScrollView>
            <View style={[{marginBottom: !isKeyboardVisible ? 30: 5}, styles.detailContainer]}>
                <TouchableOpacity onPress={onImagePickerPress} style={styles.detailButton}>
                    <MaterialCommunityIcons name="image-plus" style={{fontSize: 35, color: Colors.light.tint}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDetailPress} style={styles.detailButton}>
                    <MaterialIcons name="category" style={{fontSize: 30, color: Colors.light.tint}}/>
                </TouchableOpacity>
            </View>
            <GigRequestBottomSheet
                handleSheetChanges={handleSheetChanges}
                bottomSheetModalRef={bottomSheetModalRef}
                getValueFromBottomSheet={getValueFromBottomSheet}
                defaultData={{location: location, category: category}}
            />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        height: '100%',
        // paddingTop: 35,
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
        margin: 5,
    },
    reviewInput: {
        textAlignVertical: 'top',
        height: 200,
        maxHeight: 300,
        fontSize: 16,
        margin: 5,
        padding: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
        margin: 10
    },
    detailTopContainer: {
        backgroundColor: 'white',
        borderColor: Colors.light.darkerGrey,
        flexDirection: 'row',
        paddingVertical: 5,
        marginRight: 5,
    },
    detailContainer: {
        backgroundColor: 'white',
        // borderTopWidth: 1,
        borderColor: Colors.light.darkerGrey,
        flexDirection: 'row',
        paddingVertical: 5,
        marginLeft: 5,
    },
    topContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    taskOwnerName: {
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
        borderRadius: 5,
        marginHorizontal: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    submitButtonText: {
        color: '#fff'
    },
    detailButton: {
        borderRadius : 5,
        borderColor: Colors.light.tint,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5
    },
    detailTopButton: {
        borderRadius : 5,
        borderColor: Colors.light.tint,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5
    },
    infoContainer: {
        padding: 5,
        justifyContent: 'flex-start',
        alignContent: 'flex-start'
    },
    tagsContainer: {
        paddingVertical: 10,
        marginHorizontal: 5,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    tag: {
        borderRadius: 10,
        backgroundColor: Colors.light.tint,
        marginHorizontal: 2
    },
    text: {
        paddingHorizontal: 4,
        paddingVertical: 4,
        marginHorizontal: 4,
        marginTop: 1,
        marginBottom: 2,
        color: '#fff',
    },
})
