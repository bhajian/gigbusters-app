import React, {useState} from "react";
import {Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import UserAvatar from "@muhzi/react-native-user-avatar";
import Feather from "react-native-vector-icons/Feather";
import ImageList from "../ImageList";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Entypo from "react-native-vector-icons/Entypo";


export default function WorkerRequest({item}) {

    const [profileName, setProfileName] = useState('')
    const [category, setCategory] = useState('')
    const [location, setLocation] = useState('')
    const [distance, setDistance] = useState(50)
    const [description, setDescription] = useState(50)
    const [price, setPrice] = useState(20)
    const [profileImage, setProfileImage] = useState(null)
    const [images, setImages] = useState([])
    const [dataBeingSaved, setDataBeingSaved] = useState(false)

    return (
        <View>
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
                        images.map((e)=> <ImageList key={e.toString()} item={e} remove={removeImage} />)
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
        </View>
    );
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
    reviewerText: {

    }
})
