import React, { Component } from "react";
import {StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Colors from "../../../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";

const DATA = [
    {
        id: "1",
        title: "Data Structures",
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

class SearchCategory extends Component {
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

    render() {
        return (
            <View>
                <View style={styles.topContainer}>
                    <View style={styles.headerContainer}>
                        <View style={styles.searchTextContainer}>
                            <Fontisto name="search" size={17} color="grey" />
                            <TextInput
                                onChangeText={value => this.searchFunction(value)}
                                style={styles.searchInput}
                                placeholder={"Search..."}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            style={styles.closeButton}>
                            <Text style={styles.closeText}> Cancel </Text>
                        </TouchableOpacity>
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

export default SearchCategory;

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
    searchInput:{
        marginLeft: 10,
        width: '100%',
    },
    searchTextContainer: {
        backgroundColor: '#eaebf6',
        width: '80%',
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
