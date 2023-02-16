import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, Pressable, TouchableOpacity, Image, TextInput,} from 'react-native';
import styles from './styles';
import {useNavigation} from "@react-navigation/native";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import users from '../../../../assets/data/users'
export default function RequestReferralScreen({route}) {
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
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.backButton}>
                            <FontAwesome name="chevron-left" style={styles.backIcon}/>
                            <Text style={styles.backIcon}>  Back </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.submitButton} onPress={submitRequest}>
                        <Ionicons name="enter" size={25} color="white"/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.imageContainer}>
                <Image
                    source={{uri : users[0].image}}
                    style={styles.image}
                />
            </View>
            <View style={styles.inputsContainer}>
                <TextInput
                    // value={tipoff}
                    // onChangeText={value => setTipoff(value)}
                    multiline={true}
                    style={styles.reviewInput}
                    placeholder={"Details..."}
                />
            </View>
            <View style={styles.imageContainer}>
                <TouchableOpacity  style={styles.pickImage}>
                    <MaterialCommunityIcons name="image-plus" style={{fontSize: 65, color: Colors.light.grey}} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.pickImage}>
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
        </View>
    );
};

