import React, { Component } from "react";
import {StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Colors from "../../../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import {useNavigation} from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import PhoneInput from "react-phone-number-input/react-native-input";

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
            <Text>{title}</Text>
        </View>
    );
};

const renderItem = ({ item }) => <Item title={item.title} />;
// const navigation = useNavigation();
class AccountSearchReviewScreen extends Component {
    constructor(props) {
        super(props);
        this.props = props
        this.state = {
            loading: false,
            data: DATA,
            error: null,
            searchValue: "",
        };
        this.arrayholder = DATA;
    }

    searchFunction = (text) => {
        const updatedData = this.arrayholder.filter((item) => {
            const item_data = `${item.title.toUpperCase()})`;
            const text_data = text.toUpperCase();
            return item_data.indexOf(text_data) > -1;
        });
        this.setState({ data: updatedData, searchValue: text });
    };

    onSubmitPress = () => {
        this.props.navigation.navigate('NewReviewScreen');
    }

    onBackPress = (text) => {
        this.props.navigation.goBack()
    }

    handlePresentPress = () => bottomSheetModalRef.current.present()

    render() {
        return (
            <View>
                <View style={styles.topContainer}>
                    <View style={styles.headerContainer}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity
                                onPress={this.onBackPress}
                                style={styles.backButton}>
                                <FontAwesome name="chevron-left" style={styles.backIcon}/>
                                <Text style={styles.backIcon}>  Back </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.socialButton} onPress={this.onSubmitPress}>
                            <Text style={styles.socialButtonText}>Social Media</Text>
                            <Feather name="chevron-down" size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={this.onSubmitPress}>
                            <Text style={styles.buttonText}>Next</Text>
                            {/*<Ionicons name="enter" size={25} color="white"/>*/}
                        </TouchableOpacity>
                    </View>
                    {/*<PhoneInput*/}
                    {/*    countrySelectProps={{ unicodeFlags: true }}*/}
                    {/*    value={'+1'}*/}
                    {/*    // onChange={setValue}*/}
                    {/*    style={styles.accountInput}*/}
                    {/*/>*/}
                    <View style={styles.searchTextContainer}>

                        <Fontisto name="search" size={17} color="grey" />
                        <TextInput
                            onChangeText={value => this.searchFunction(value)}
                            style={styles.searchInput}
                            placeholder={"Search..."}
                        />
                    </View>
                </View>

                <View style={styles.container}>
                    <FlatList
                        data={this.state.data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
        );
    }
}

export default AccountSearchReviewScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFFFFF'
    },
    item: {
        backgroundColor: "#fdfdfd",
        padding: 8,
        marginVertical: 2,
        marginHorizontal: 16,
        borderBottomColor: '#e7e5e5',
        borderBottomWidth: 1
    },
    topContainer: {
        backgroundColor: '#ffffff',
        // height: 125,
        width: '100%',
    },
    headerContainer: {
        zIndex: -1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
        marginTop: 40,
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
        width: 130,
        height: 37,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInput:{
        marginLeft: 10,
        width: '100%',
    },
    searchTextContainer: {
        backgroundColor: '#eaebf6',
        marginHorizontal: 10,
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderRadius: 10,
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
    closeText: {
        fontSize: 17,
        color: Colors.light.tint,
    },
});
