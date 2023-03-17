import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    Text,
    Pressable,
    SafeAreaView, StyleSheet, FlatList
} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import {useNavigation} from "@react-navigation/native";
import RequestItem from "../../components/RequestItem";
import {TaskService} from "../../backend/TaskService";

export default function RequestFeedScreen(props) {

    const [requestList, setRequestList] = useState([])
    const navigation = useNavigation();
    const taskService = new TaskService()

    useEffect(() => {
        loadData().then().catch(e => console.log(e))
    }, []);

    async function loadData() {
        const requestObj = await taskService.listNeighborsTasks()
        setRequestList(requestObj)
    }

    const handlePresentPress = () => bottomSheetModalRef.current.present()
    const handleSheetChanges = useCallback((index) => {

    }, [])

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            tabBarIcon: ({color}) => (
                <Fontisto name="react" size={25} color={color}/>
            ),
            headerTitle: () => (
                <Text>Feed</Text>
            ),
            headerRight: () => (
                <Pressable
                    onPress={handlePresentPress}
                    style={({pressed}) => ({
                        opacity: pressed ? 0.5 : 1,
                        marginRight: 10,
                    })}>
                    <MaterialCommunityIcons
                        name="account-search"
                        size={25}
                        color={Colors.light.tint}
                        style={{marginRight: 15}}
                    />
                </Pressable>
            ),
            // headerLeft: () => (
            //
            // ),
        })

    }, [navigation]);

    return (
        <SafeAreaView style={styles.contentContainer}>
            <FlatList
                data={requestList}
                renderItem={({item}) => <RequestItem request={item} />}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
    },
    searchBarContainer: {
        flexDirection: "row",
        width: '100%',
        borderBottomColor: 'grey',
        backgroundColor: 'white',
    },
    searchInput: {
        flexDirection: "row",
        paddingTop: 7,
        paddingLeft: 7,
        marginHorizontal: 7,
        width: '80%',
        backgroundColor: '#eae8e8',
        borderRadius: 10,
    },
    searchButton: {
        marginTop: 10,
        marginLeft: 5,
        maxWidth: '12%'
    },
    contentContainer: {
        backgroundColor: '#ffffff',
    },
    iconContainer: {
        borderWidth: 1,
        width: 30,
        height: 30,
        borderColor: "grey",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid'
    },
});
