import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, Image} from "react-native";
import Colors from "../../constants/Colors";
import {CategoryService} from "../../backend/CategoryService";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import {useNavigation} from "@react-navigation/native";
import loading2 from "../../../assets/images/loading2.gif";

export default function ApplicantRequestItem(props) {
    const [categories, setCategories] = useState([])
    const [selectedValue, setSelectedValue] = useState('')
    const [dataBeingLoaded, setDataBeingLoaded] = useState(false)
    const [selectedKey, setSelectedKey] = useState(0)

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
            })
            changeColor({
                key: 0,
                categories: categoriesObj.categories
            })
        }

        setDataBeingLoaded(false)
    }

    useEffect(() => {
        getCurrentUserData().then(e => {
        }).catch(e => console.log(e))
    }, [])

    const changeColor = (params) => {
        let data = [...params.categories]
        let sv = ''
        for (let x = 0; x < params.categories.length; x++) {
            if (params.categories[x].key == params.key) {
                data[x].backgroundColor = Colors.light.tint
                data[x].textColor = '#fff'
                sv = data[x].category
            } else {
                data[x].backgroundColor = Colors.light.grey
                data[x].textColor = '#000'
            }
            setSelectedValue(sv)
            setCategories(data)
            setSelectedKey(params.key)
        }
        if(props?.passSelectedValue){
            props?.passSelectedValue(sv)
        }
    }

    async function addCategoryHook(value) {
        value.key = categories.length
        value.backgroundColor = Colors.light.tint
        value.textColor = '#fff'
        // console.log(value)

        changeColor({
            key: categories.length,
            categories: [...categories, value]
        })
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
                                // setSelectedKey(i)
                                changeColor({
                                    key: i,
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
