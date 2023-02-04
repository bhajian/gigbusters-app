import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Platform,
    Image,
    View,
    Text,
    Switch,
} from 'react-native';
import {API, graphqlOperation, Auth, Storage} from 'aws-amplify';
// import * as Permissions from 'expo-permissions';
// import * as ImagePicker from 'expo-image-picker';
import {v4 as uuidv4} from 'uuid';
import Colors from '../../constants/Colors';
import CustomSwitch from '../../components/CustomSwitch';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import UserAvatar from "@muhzi/react-native-user-avatar";
import {EvilIcons, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {AirbnbRating, Rating} from "react-native-ratings";
import Logo from "../../../assets/images/review.png";
import ReviewTypePicker from "../../components/ReviewTypePicker";
import NewReviewTopContainer from "./NewReviewTopContainer";
import {LocationSelector} from "../../components/LocationSearch";


export default function NewTipoffScreen({navigation, route}) {
    let contact = route.params ? route.params.contact : {
        name: 'behnam',
        image: 'https://d14u0p1qkech25.cloudfront.net/1073359577_1fc084e5-1ae2-4875-b27d-1a42fd80ff28_thumbnail_250x250',
        id: 1
    };

    const [senderId, setSenderId] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const togglePrivateSwitch = () =>
        setIsPrivate(previousState => !previousState);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const toggleAnonymousSwitch = () =>
        setIsAnonymous(previousState => !previousState);
    const [tipoff, setTipoff] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    // const navigation = useNavigation();

    async function getCurrentUserId() {
        // const currentUser = await Auth.currentAuthenticatedUser();
        // if (currentUser) {
        //   setSenderId(currentUser.attributes.sub);
        // }
    }

    const getPermissionAsync = async () => {
        if (Platform.OS !== 'web') {
            // const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            // if (status !== 'granted') {
            //   alert('Sorry, we need camera roll permissions to make this work!');
            // }
        }
    };

    useEffect(() => {
        getPermissionAsync().then(e => {
            getCurrentUserId().then(r => {});
        });
    }, []);

    const pickImage = async () => {
        try {
            // let result = await ImagePicker.launchImageLibraryAsync({
            //   mediaTypes: ImagePicker.MediaTypeOptions.All,
            //   allowsEditing: true,
            //   aspect: [4, 3],
            //   quality: 1,
            // });
            // if (!result.cancelled) {
            //   setImageUrl(result.uri);
            // }
            //
            // console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    const uploadImage = async () => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const urlParts = imageUrl.split('.');
            const extension = urlParts[urlParts.length - 1];
            const key = `${uuidv4()}.${extension}`;
            await Storage.put(key, blob);
            return key;
        } catch (e) {
            console.log(e);
        }
        return '';
    };


    return (
        <SafeAreaView style={styles.container}>
            <NewReviewTopContainer contact={contact} pickImage={pickImage} navigation={navigation}/>

            <View style={styles.newTweetContainer}>
                <View style={styles.ratingContainer}>
                    <Text style={styles.text} >Rating: </Text>
                    <Rating
                        imageSize={30}
                        // onFinishRating={ratingCompleted}
                        type="custom"
                        style={{ paddingVertical: 5, }}
                        ratingColor={Colors.light.tint}
                        ratingBackgroundColor='#e9eff6'
                    />
                </View>
                <View style={styles.inputsContainer}>
                    <TextInput
                        value={tipoff}
                        onChangeText={value => setTipoff(value)}
                        multiline={true}
                        style={styles.reviewInput}
                        placeholder={"What's happening?"}
                    />
                </View>

                <View style={styles.imageContainer}>
                    <TouchableOpacity onPress={pickImage} style={styles.pickImage}>
                        <MaterialCommunityIcons name="image-plus" style={{fontSize: 65, color: '#c7c9cc'}} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pickImage} style={styles.pickImage}>
                        <Image
                            source={{uri : 'https://d14u0p1qkech25.cloudfront.net/1073359577_1fc084e5-1ae2-4875-b27d-1a42fd80ff28_thumbnail_250x250'}}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 5,
                                marginVertical: 10
                            }}
                        />
                    </TouchableOpacity>
                    {/*<Image 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2900&q=80'}} />*/}
                </View>
                <LocationSelector />

                <View style={styles.newMessageSetting}>
                    <CustomSwitch
                        iconCategory={'FontAwesome5'}
                        iconName={'lock'}
                        isEnabled={isPrivate}
                        toggleSwitch={togglePrivateSwitch}
                        name={'Private'}
                    />
                    <CustomSwitch
                        iconCategory={'FontAwesome5'}
                        iconName={'user-secret'}
                        isEnabled={isAnonymous}
                        toggleSwitch={toggleAnonymousSwitch}
                        name={'Anonymous'}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: 'white',
        height: '100%',
    },
    headerExtensionContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
    },
    headerContainer: {
        zIndex: -1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
    },
    headerLeft: {
        flexDirection: 'row',
        paddingStart: 5,
        paddingEnd: 10,
    },
    closeButton: {
        flexDirection: 'row',
        marginTop: 7,
        paddingEnd: 10,
    },
    closeIcon: {
        fontSize: 17,
        color: Colors.light.tint,
    },
    contactName: {
        padding: 10,
    },
    button: {
        backgroundColor: Colors.light.tint,
        borderRadius: 10,
        width: 70,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        paddingVertical: 10,
        marginHorizontal: 4,
        fontSize: 25,
        textAlignVertical: 'bottom',
    },
    newTweetContainer: {
        zIndex: -10,
        flexDirection: 'column',
        padding: 15,
        width: '100%'
    },
    inputsContainer: {
        marginLeft: 5,
        backgroundColor: '#e9eff6',
    },
    reviewInput: {
        height: 150,
        maxHeight: 300,
        fontSize: 20,
        padding: 5,
    },
    pickImage: {
        // borderWidth: 1,
        // borderColor: Colors.light.tint,
        borderRadius: 5,
        marginVertical: 10,
        marginHorizontal: 2,
    },
    settingText: {
        fontSize: 15,
        marginVertical: 10,
    },
    imageContainer: {
        width: '100%',
        // height: 150,
        flexDirection: 'row',
    },
    newMessageSetting: {
        bottom: 0,
        flexDirection: 'row',
        margin: 5,

    },
    topContainer: {
        backgroundColor: '#ffffff',
        // height: 125,
        width: '100%',
    },
    privateSwitch: {
        transform: [{scaleX: 0.7}, {scaleY: 0.7}],
        marginTop: 5,
    },
});
