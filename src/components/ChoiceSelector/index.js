import React, {Component, useState} from "react";
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Colors from "../../constants/Colors";
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
        title: "Lawn mower",
    },
    {
        id: "4",
        title: "Software Engineer",
    },
    {
        id: "5",
        title: "Snow Plow",
    },
    {
        id: "6",
        title: "Moving",
    },
    {
        id: "7",
        title: "Sales Rep",
    },
    {
        id: "8",
        title: "Cashier",
    },
    {
        id: "9",
        title: "Cooking",
    },
    {
        id: "10",
        title: "Cleaning",
    },
    {
        id: "11",
        title: "Personal Trainer",
    },
    {
        id: "12",
        title: "Tennis Coach",
    },
];

class ChoiceSelector extends Component {
    constructor(props) {
        super(props);
        this.props = props

        DATA.map((item, i) => {
            item.key = i
            item.backgroundColor = Colors.light.grey
            item.textColor = '#000'
        })

        this.state = {
            loading: false,
            data: DATA,
            error: null,
            selectedValue: "",
        }
    }

    changeColor = key => {
        let data = JSON.parse(JSON.stringify(this.state.data))
        let selectedValue = ''
        for (let x = 0; x < this.state.data.length; x++) {
            if (this.state.data[x].key == key) {
                data[x].backgroundColor = Colors.light.tint
                data[x].textColor = '#fff'
                selectedValue = data[x].title
            }else {
                data[x].backgroundColor = Colors.light.grey
                data[x].textColor = '#000'
            }
            this.setState({
                data: data,
                selectedValue: selectedValue
            })
        }
        this.props?.passSelectedValue(selectedValue)
        // console.log(selectedValue)
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.data.map((item, i) => {
                    return(
                        <TouchableOpacity
                            key={i}
                            onPress={() => {
                                this.setState({
                                    selectedValue: item.title
                                })
                                this.changeColor(i)
                            }}
                            style={[styles.buttonSelector, {backgroundColor: item.backgroundColor}]}>
                            <Text style={{color: item.textColor}}>{item.title}</Text>
                        </TouchableOpacity>
                    )
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
        marginHorizontal: 3,
        marginVertical: 3,
        padding: 5,
        borderRadius: 5,
    },
});
