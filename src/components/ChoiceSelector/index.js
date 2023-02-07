import React, { Component } from "react";
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import filter from "lodash.filter";

const DATA = [
    {
        id: "1",
        title: "Dog walker",
    },
    {
        id: "2",
        title: "Baby Sitter",
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

const Item = ({ id, title }) => {
    return (
        <TouchableOpacity
            key={id}
            onPress={() => {}}
            style={styles.buttonSelector}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

class ChoiceSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: DATA,
            error: null,
            searchValue: "",
        };
        this.arrayholder = DATA;
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.data.map((item, i) => {
                    return(Item(item))
                })}
            </View>
        );
    }
}

export default ChoiceSelector;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginHorizontal: 5,
        padding: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        display: 'flex',
        width: '90%'
    },
    buttonSelector:{
        backgroundColor: '#bfbfbf',
        marginHorizontal: 3,
        marginVertical: 3,
        padding: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF'
    }
});
