import React, {Component, useCallback, useEffect, useState} from "react";
import {StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from "react-native";
import Colors from "../../constants/Colors";
import {CategoryService} from "../../backend/CategoryService";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import {useNavigation} from "@react-navigation/native";
import loading2 from "../../../assets/images/loading2.gif";

export default function ApplicantRequestItem(props) {
    const [categories, setCategories] = useState([])
    const [selectedValue, setSelectedValue] = useState('')
    const [dataBeingLoaded, setDataBeingLoaded] = useState(false)

    const navigation = useNavigation()
    const categoryService = new CategoryService()

    async function getCurrentUserData() {
        setDataBeingLoaded(true)
        const categoriesObj = await categoryService.queryCategories({
            limit: 15
        })
        if(categoriesObj.categories){
            categoriesObj.categories.map((item, i) => {
                item.key = i
                if(i !== 0){
                    item.backgroundColor = Colors.light.grey
                    item.textColor = '#000'
                } else {
                    item.backgroundColor = Colors.light.tint
                    item.textColor = '#fff'
                    setSelectedValue(item.category)
                    if(props?.passSelectedValue){
                        props?.passSelectedValue(item.category)
                    }
                }
            })
            setCategories(categoriesObj.categories)
        }

        setDataBeingLoaded(false)
    }

    useEffect(() => {
        getCurrentUserData().then(e => {
        }).catch(e => console.log(e))
    }, [])

    const changeColor = useCallback((key) => {
        let data = [...categories]
        let selectedValue = ''
        for (let x = 0; x < categories.length; x++) {
            if (categories[x].key == key) {
                data[x].backgroundColor = Colors.light.tint
                data[x].textColor = '#fff'
                selectedValue = data[x].category
            } else {
                data[x].backgroundColor = Colors.light.grey
                data[x].textColor = '#000'
            }
            setSelectedValue(selectedValue)
            setCategories(data)
        }
        if(props?.passSelectedValue){
            props?.passSelectedValue(selectedValue)
        }
    }, [categories])

    async function addCategoryHook(value) {
        setCategories([value, ...categories])
    }

    return (
        dataBeingLoaded ?
            <Image source={loading2} style={styles.loadingImage}/>
            :
            <View style={styles.container}>
                {categories.map((item, i) => {
                    return (
                        <TouchableOpacity
                            key={i}
                            onPress={() => {
                                setSelectedValue(item.category)
                                changeColor(i)
                            }}
                            style={[styles.buttonSelector, {backgroundColor: item.backgroundColor}]}>
                            <Text style={{color: item.textColor}}>{item.category}</Text>
                        </TouchableOpacity>
                    )
                })}
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('SearchCategory', {
                            onGoBack: addCategoryHook
                        })
                    }}
                    style={[styles.buttonSelector, {backgroundColor: Colors.light.grey, flexDirection: 'row'}]}>
                    <EvilIcons name="search" size={20}/>
                    <Text style={{color: '#000'}}>Search Or Add More</Text>
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        display: 'flex',
        width: '90%'
    },
    buttonSelector:{
        marginRight: 5,
        marginVertical: 3,
        padding: 5,
        borderRadius: 5,
    },
    loadingImage: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginTop: 20,
    }
})
