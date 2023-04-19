import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, Image} from "react-native";
import Colors from "../../constants/Colors";
import {CategoryService} from "../../backend/CategoryService";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import {useNavigation} from "@react-navigation/native";
import loading2 from "../../../assets/images/loading2.gif";

export default function CategoryMultiSelector({onSelectionChanged, selectedItems}) {

    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [dataBeingLoaded, setDataBeingLoaded] = useState(false)

    const navigation = useNavigation()
    const categoryService = new CategoryService()

    async function loadData() {
        setDataBeingLoaded(true)
        const categoriesObj = await categoryService.queryCategories({
            limit: 15
        })

        if(categoriesObj.categories){
            categoriesObj.categories.map((item, i) => {
                item.key = i
            })
            console.log(selectedItems)
            await setCategoriesFistTime({
                categories: categoriesObj.categories
            })

            await setSelectedCategoriesFistTime(selectedItems)
        }

        setDataBeingLoaded(false)
    }

    useEffect(() => {
        loadData().then(e => {
        }).catch(e => console.log(e))
    }, [])

    const setSelectedCategoriesFistTime = async (params) => {
        for (let x = 0; x < params.length; x++) {
            selectItem({key: params[x]})
        }
    }

    const setCategoriesFistTime = async(params) => {
        let data = [...params.categories]
        for (let x = 0; x < params.categories.length; x++) {
            data[x].backgroundColor = Colors.light.grey
            data[x].textColor = '#000'
            data[x].key = data[x].category.toLowerCase()
        }
        setCategories(data)
    }
    const selectItem = (params) => {
        let existingData = [...categories]
        let selectedData = [...selectedCategories]
        for (let x = 0; x < existingData.length; x++) {
            if (existingData[x].key === params.key) {
                existingData[x].backgroundColor = Colors.light.tint
                existingData[x].textColor = '#fff'
                const item = existingData.splice(x, 1)
                selectedData.push(item[0])
            }
        }
        setCategories(existingData)
        setSelectedCategories(selectedData)
        onSelectionChanged(selectedData)
    }

    const unSelectItem = (params) => {
        let existingData = [...categories]
        let selectedData = [...selectedCategories]
        for (let x = 0; x < selectedData.length; x++) {
            if (selectedData[x].key === params.key) {
                selectedData[x].backgroundColor = Colors.light.grey
                selectedData[x].textColor = '#000'
                const item = selectedData.splice(x, 1)
                existingData.push(item[0])
            }
        }
        setCategories(existingData)
        setSelectedCategories(selectedData)
        onSelectionChanged(selectedData)
    }

    async function addCategoryHook(value) {
        value.key = categories.length
        value.backgroundColor = Colors.light.tint
        value.textColor = '#fff'
        selectItem({
            key: categories.length,
            categories: [...categories, value]
        })
    }

    return (
        dataBeingLoaded ?
            <Image source={loading2} style={styles.loadingImage}/>
            :
            <View style={styles.container}>
                <View style={styles.selectedContainer}>
                    {selectedCategories.map((item, i) => {
                        return (
                            <TouchableOpacity
                                key={item.category.toLowerCase()}
                                onPress={() => {
                                    unSelectItem({
                                        key: item.category.toLowerCase(),
                                        categories: selectedCategories
                                    })
                                }}
                                style={[styles.buttonSelector, {backgroundColor: item.backgroundColor}]}>
                                <Text style={{color: item.textColor}}>{item.category}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>


                {categories.map((item, i) => {
                    return (
                        <TouchableOpacity
                            key={item.category.toLowerCase()}
                            onPress={() => {
                                selectItem({
                                    key: item.category.toLowerCase(),
                                    categories: categories
                                })
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
        width: '100%'
    },
    selectedContainer: {
        marginTop: 10,
        padding: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        display: 'flex',
        width: '100%'
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
