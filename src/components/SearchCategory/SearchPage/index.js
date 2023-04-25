import React, {Component, useCallback, useEffect, useState} from "react";
import {StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput} from "react-native"
import Colors from "../../../constants/Colors"
import Fontisto from "react-native-vector-icons/Fontisto"
import {useNavigation} from "@react-navigation/native";
import {CategoryService} from "../../../backend/CategoryService";
import Entypo from "react-native-vector-icons/Entypo";



export default function SearchCategory({route}) {
    const {onGoBack} = (route.params ? route.params : null)

    const [categories, setCategories] = useState([])
    const [selectedValue, setSelectedValue] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [dataBeingLoaded, setDataBeingLoaded] = useState(false)

    const navigation = useNavigation()
    const categoryService = new CategoryService()

    async function getCurrentUserData(prams) {
        setDataBeingLoaded(true)
        const categoriesObj = await categoryService.queryCategories({
            limit: 500,
            prefix: prams.prefix
        })
        if(categoriesObj.categories){
            setCategories(categoriesObj.categories)
        }
        setDataBeingLoaded(false)
    }

    useEffect(() => {
        getCurrentUserData({}).then(r => {}).catch(e => console.log(e))
    }, [])

    async function addCategoryPress() {
        await categoryService.createCategory({category: searchValue})
        setCategories([{category: searchValue, ranking: 0}, ...categories])
    }

    async function searchValueChange(value) {
        setSearchValue(value)
        await getCurrentUserData({
            prefix: value
        })
    }

    const Item = ({ item, handlePressed }) => {
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={e=>{
                    handlePressed(item)
                    navigation.goBack()
                }}
            >
                <Text>{item.category}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.searchTextContainer}>
                        <Fontisto name="search" size={17} color="grey" />
                        <TextInput
                            onChangeText={searchValueChange}
                            style={styles.searchInput}
                            placeholder={"Search..."}
                        />
                        <TouchableOpacity style={styles.addButton} onPress={addCategoryPress}>
                            <Entypo name="add-to-list" size={20} style={styles.addIcon} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.closeButton}>
                        <Text style={styles.closeText}> Cancel </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={categories}
                    renderItem={(item) => Item({
                        item: item.item, handlePressed: onGoBack
                    })}
                    keyExtractor={(item) => item.category}
                />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFFFFF',
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
    },
    listContainer: {
        marginHorizontal: 10
    },
    headerContainer: {
        zIndex: -1,
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        borderBottomColor: 'lightgrey',
        marginTop: 50,
    },
    headerLeft: {
        flexDirection: 'row',
        paddingStart: 5,
        paddingEnd: 10,
    },
    searchInput:{
        marginLeft: 10,
        width: '80%',
    },
    searchTextContainer: {
        width: '80%',
        backgroundColor: Colors.light.grey,
        borderColor: '#e8e8e8',
        borderBottomWidth: 0.5,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderRadius: 10,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    closeButton: {
        width: '20%',
        marginLeft: 5,
        flexDirection: 'row',
        alignSelf: 'center',
        paddingEnd: 10,
    },
    closeText: {
        fontSize: 17,
        color: Colors.light.tint,
    },
    addIcon: {
        fontSize: 20,
        color: Colors.light.tint,
        marginHorizontal: 3,
    },
    addButton: {
        borderColor: Colors.light.tint,
        borderWidth: 1,
        borderRadius: 5,

    }
})
