import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    ImageBackground,
    Pressable,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import styles from './styles';
import {useNavigation} from "@react-navigation/native";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import users from '../../../../assets/data/users'
import UserAvatar from "@muhzi/react-native-user-avatar";
import Feather from "react-native-vector-icons/Feather";

export default function WorkerRequestCompletionScreen({route}) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [locationMax, setLocationMax] = useState(10);
    const [priceMax, setPriceMax] = useState(10);
    const navigation = useNavigation();

    useEffect(() => {

    }, [navigation]);

    function submitRequest() {
        navigation.navigate('RequestReferralCompletedScreen')
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" >
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
                    <TouchableOpacity style={styles.submitButton} onPress={submitRequest}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <View style={styles.avatarReviewerContainer}>
                        <UserAvatar
                            size={35}
                            active
                            src="https://d14u0p1qkech25.cloudfront.net/1073359577_1fc084e5-1ae2-4875-b27d-1a42fd80ff28_thumbnail_250x250"
                        />
                        <TouchableOpacity style={styles.reviewerName}>
                            <Text style={styles.reviewerText}>Behnam</Text>
                            <Feather name="chevron-down" size={20}/>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.inputsContainer}>
                    <TextInput
                        multiline={true}
                        style={styles.reviewInput}
                        placeholder={"Details..."}
                    />
                    <Image
                        source={{uri: users[0].image}}
                        style={styles.image}
                    />
                </View>
            </ScrollView>
            <View style={styles.imageSelectorContainer}>
                <TouchableOpacity style={styles.pickImage}>
                    <MaterialCommunityIcons name="image-plus" style={{fontSize: 50, color: 'white'}}/>
                </TouchableOpacity>

                    {users.map((item, i) => {
                        return(
                            <TouchableOpacity style={styles.pickImage}>
                                <Image
                                    source={{uri: item.image}}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 5,
                                        margin: 5
                                    }}
                                />
                            </TouchableOpacity>
                        )
                    })}

            </View>

        </KeyboardAvoidingView>
    );
};

