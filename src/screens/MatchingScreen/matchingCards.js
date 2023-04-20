import {Button, Dimensions, Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {TaskService} from "../../backend/TaskService";
import MatchingCard from "../../components/MatchingCard";
import Swiper from "react-native-deck-swiper";
import {useNavigation} from "@react-navigation/native";
import Colors from "../../constants/Colors";
import {Ionicons, MaterialCommunityIcons, Octicons} from "@expo/vector-icons";
import MatchingSearch from "./MatchingSearch";


const MatchingCards = () => {
    const [cardList, setCardList] = useState([])
    const swiperRef = useRef(null)
    const bottomSheetModalRef = useRef(null)

    const taskService = new TaskService()
    const navigation = useNavigation()

    const handlePresentPress = () => bottomSheetModalRef.current.present()
    const handleSheetChanges = useCallback((index) => {
    }, [])

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            tabBarIcon: ({color}) => (
                <Octicons name="stack" size={25} color={color}/>
            ),
            headerTitle: () => (
                <View style={{marginHorizontal: 15}}>
                </View>
            ),
            headerRight: () => (
                <Pressable
                    onPress={handlePresentPress}
                    style={({pressed}) => ({
                        opacity: pressed ? 0.5 : 1,
                        marginRight: 10,
                    })}>
                    <MaterialCommunityIcons
                        name="tune-vertical"
                        size={25}
                        color={Colors.light.tint}
                        style={{marginHorizontal: 15}}
                    />
                </Pressable>
            ),
            headerLeft: () => (
                <View style={{marginHorizontal: 15}}>
                    <Ionicons name="notifications-sharp" size={25} color={Colors.light.darkerGrey}/>
                </View>
            ),
        })
    }, [navigation]);


    useEffect(() => {
        loadData().then().catch(e => console.log(e))
    }, []);

    async function loadData() {
        const tasksObj = await taskService.listNeighborsTasks({
            limit: 500,
        })
        setCardList(tasksObj)
    }

    async function onRightSwiped(cardIndex) {
        try{
            const card = cardList[cardIndex]
            const res = await taskService.applyTask({
                taskId: card.id
            })
        } catch (e) {
            console.log(e)
        }
    }

    async function onLeftSwiped(cardIndex) {

    }
    async function onRightPressed() {
        swiperRef.current.swipeRight()
    }

    async function onLeftPressed() {
        swiperRef.current.swipeLeft()
    }

    return (
        <SafeAreaView style={styles.container}>
            <Swiper
                ref={swiperRef}
                cards={cardList}
                cardIndex={0}
                renderCard={(card) => {
                    return (
                        card&&<MatchingCard
                            card={card}
                            onRightPressed={onRightPressed}
                            onLeftPressed={onLeftPressed} />
                    )
                }}
                onSwipedRight={(e) => {onRightSwiped(e)}}
                onSwipedLeft={(e) => {onLeftSwiped(e)}}
                onSwiped={(cardIndex) => {}}
                onSwipedAll={() => {console.log('onSwipedAll')}}
                backgroundColor={Colors.light.grey}
                infinite={true}
                containerStyle={{top: 0, width: '100%'}}
                cardStyle={{top: 5, left: '2%', width: '96%', justifyContent: 'center',}}
                stackSize= {2}>

            </Swiper>
            <MatchingSearch
                bottomSheetModalRef={bottomSheetModalRef}
                handleSheetChanges={handleSheetChanges}
            />
        </SafeAreaView>
    )
}

export default MatchingCards

const styles = {
    container: {
        flex: 1,
        // display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    header: {
        color: '#000',
        fontSize: 30,
        marginBottom: 30,
    },
    cardContainer: {
        width: '90%',
        maxWidth: 260,
        height: 300,
    },
    card: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: '100%',
        maxWidth: 260,
        height: 300,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 20,
        borderRadius: 20,
        resizeMode: 'cover',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 20,
    },
    cardTitle: {
        position: 'absolute',
        bottom: 0,
        margin: 10,
        color: '#fff',
    },
    buttons: {
        margin: 20,
        zIndex: -100,
    },
    infoText: {
        height: 28,
        justifyContent: 'center',
        display: 'flex',
        zIndex: -100,
    }
}
