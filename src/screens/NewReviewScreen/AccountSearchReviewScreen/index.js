import React, {Component, useCallback, useEffect, useRef, useState} from "react";
import {StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Colors from "../../../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import {useNavigation} from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import PhoneInput from "react-phone-number-input/react-native-input";
import UserAvatar from "@muhzi/react-native-user-avatar";
import SocialNetworkSelector from "../SocialNetworkSelector";
import Entypo from "react-native-vector-icons/Entypo";
import {FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";

const DATA = [
    {
        id: "1",
        title: "Johnathan Mcain",
    },
    {
        id: "2",
        title: "STL",
    },
    {
        id: "3",
        title: "C++",
    },
    {
        id: "4",
        title: "Java",
    },
    {
        id: "5",
        title: "Python",
    },
    {
        id: "6",
        title: "CP",
    },
    {
        id: "7",
        title: "ReactJs",
    },
    {
        id: "8",
        title: "NodeJs",
    },
    {
        id: "9",
        title: "MongoDb",
    },
    {
        id: "10",
        title: "ExpressJs",
    },
    {
        id: "11",
        title: "PHP",
    },
    {
        id: "12",
        title: "MySql",
    },
];

const Item = ({ title }) => {
    return (
        <View style={styles.item}>
            <UserAvatar
                size={35}
                active
                src="https://m.media-amazon.com/images/M/MV5BMjE4MDI3NDI2Nl5BMl5BanBnXkFtZTcwNjE5OTQwOA@@._V1_.jpg"
            />
            <Text style={styles.nameText}>{title}</Text>
        </View>
    );
};

const renderItem = ({ item }) => <Item title={item.title} />;

const SocialIcon = ({ name }) => {
    if(name === 'phone'){
        return <Entypo
                    style={styles.icon}
                    name={"phone"}
                />
    }
    if(name === 'web'){
        return <MaterialCommunityIcons
                    style={styles.icon}
                    name={"web"}
                />
    }
    if(name === 'instagram'){
        return <Entypo
                    style={styles.icon}
                    name={"instagram"}
                />
    }
    if(name === 'tiktok'){
        return <FontAwesome5
                    style={styles.icon}
                    name={"tiktok"}
                />
    }
    if(name === 'twitter'){
        return <FontAwesome5
                    style={styles.icon}
                    name={"twitter"}
                />
    }
    if(name === 'linkedin'){
        return <FontAwesome5
                    style={styles.icon}
                    name={"linkedin"}
                />
    }
    if(name === 'facebook'){
        return <FontAwesome5
                    style={styles.icon}
                    name={"facebook"}
                />
    }
    return <></>
}

export default function AccountSearchReviewScreen({navigation, route}) {
    const [accountType, setAccountType] = useState('phone');
    const [phone, setPhone] = useState('+1');
    const bottomSheetModalRef = useRef(null);
    const handleSheetChanges = useCallback((value) => {
        setAccountType(value)
    }, []);

    useEffect(() => {

    }, []);

    const state = {
        loading: false,
        data: DATA,
        error: null,
        searchValue: "",
    };

    function handlePresentPress() {
        bottomSheetModalRef.current.present()
    }

    const searchFunction = (text) => {
        // const updatedData = arrayholder.filter((item) => {
        //     const item_data = `${item.title.toUpperCase()})`;
        //     const text_data = text.toUpperCase();
        //     return item_data.indexOf(text_data) > -1;
        // });
        // this.setState({ data: updatedData, searchValue: text });
    };

    const onSubmitPress = () => {
        navigation.navigate('NewReviewScreen');
    }

    const onBackPress = (text) => {
        navigation.goBack()
    }

    return (
        <View>
            <View style={styles.topContainer}>
                <View style={styles.searchContainer}>
                    <View style={styles.revieweeContainer}>
                        <TouchableOpacity style={styles.socialButton} onPress={handlePresentPress}>
                            <SocialIcon name={accountType} />
                            {/*<Text style={styles.socialButtonText}>{accountType}</Text>*/}
                            <Feather name="chevron-down" size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.selectButton} onPress={handlePresentPress}>
                            <Entypo name="download" size={20} />
                        </TouchableOpacity>
                        <PhoneInput
                            countrySelectProps={{ unicodeFlags: true }}
                            value={phone}
                            onChange={setPhone}
                            style={styles.accountInput}
                        />
                    </View>
                    <View style={styles.searchTextContainer}>
                        <Fontisto name="search" size={17} color="grey" />
                        <TextInput
                            onChangeText={value => searchFunction(value)}
                            style={styles.searchInput}
                            placeholder={"Search..."}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.container}>
                {/*<FlatList*/}
                {/*    data={state.data}*/}
                {/*    renderItem={renderItem}*/}
                {/*    keyExtractor={(item) => item.id}*/}
                {/*/>*/}
            </View>
            <SocialNetworkSelector
                handleSheetChanges={handleSheetChanges}
                bottomSheetModalRef={bottomSheetModalRef}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFFFFF'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#fdfdfd",
        padding: 8,
        marginVertical: 2,
        marginHorizontal: 16,
        borderBottomColor: '#e7e5e5',
        borderBottomWidth: 1
    },
    topContainer: {
        backgroundColor: '#ffffff',
        marginTop: 15,
        width: '100%',
    },
    headerContainer: {
        zIndex: -1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        // borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
        marginTop: 50,
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
    button: {
        backgroundColor: Colors.light.tint,
        borderRadius: 10,
        width: 70,
        height: 37,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
    },
    socialButton: {
        flexDirection: 'row',
        backgroundColor: Colors.light.grey,
        borderRadius: 5,
        width: '15%',
        paddingVertical: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectButton: {
        flexDirection: 'row',
        backgroundColor: Colors.light.grey,
        borderRadius: 5,
        width: '15%',
        paddingVertical: 7,
        marginLeft: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInput:{
        marginLeft: 10,
        width: '100%',
    },
    searchContainer: {

    },
    revieweeContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        width: '100%'
    },
    accountInput: {
        backgroundColor: Colors.light.grey,
        marginLeft: 8,
        paddingHorizontal: 5,
        borderRadius: 5,
        width: '60%',
    },
    searchTextContainer: {
        backgroundColor: Colors.light.grey,
        marginHorizontal: 10,
        borderColor: '#e8e8e8',
        borderBottomWidth: 1,
        borderRadius: 5,
        marginVertical: 5,
        flexDirection: 'row',
        padding: 10,
    },
    closeButton: {
        marginLeft: 5,
        flexDirection: 'row',
        alignSelf: 'center',
        // marginTop: 7,
        paddingEnd: 10,
    },
    nameText: {
        marginHorizontal: 10,
    },
    closeText: {
        fontSize: 17,
        color: Colors.light.tint,
    },
    icon: {
        fontSize: 20,
        color: Colors.light.tint,
        marginHorizontal: 3,
    }
});
