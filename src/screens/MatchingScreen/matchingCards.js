import {Alert, Platform, Pressable, SafeAreaView, Text, View} from "react-native";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {TaskService} from "../../backend/TaskService";
import MatchingCard from "../../components/MatchingCard";
import Swiper from "react-native-deck-swiper";
import {useNavigation} from "@react-navigation/native";
import Colors from "../../constants/Colors";
import {MaterialCommunityIcons, Octicons} from "@expo/vector-icons";
import MatchingSearch from "./MatchingSearch";
import UserAvatar from "@muhzi/react-native-user-avatar";
import {ProfileService} from "../../backend/ProfileService";
import waitAnim from "../../../assets/animations/135765-clown.json";
import Lottie from "lottie-react-native";


const MatchingCards = (props) => {
    const swiperRef = useRef(null)
    const bottomSheetModalRef = useRef(null)
    const taskService = new TaskService()
    const navigation = useNavigation()
    const profileService = new ProfileService()
    const profile = profileService.getProfile()

    const [cardList, setCardList] = useState([])
    const [profileName, setProfileName] = useState(profile?.name)
    const [profileImage, setProfileImage] = useState(profile?.mainPhotoUrl)
    const [noMoreCards, setNoMoreCards] = useState(false)
    const handlePresentPress = () => bottomSheetModalRef.current.present()
    const handleSheetChanges = useCallback((index) => {
    }, [])

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="cards" size={25} color={color}/>
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
                <View style={{marginLeft: 10}}>
                    <UserAvatar
                        size={35}
                        active
                        userName={profileName}
                        src={profileImage}
                        fontSize={20}
                        backgroundColor={Colors.light.turquoise}
                    />
                </View>
            ),
        })
    }, [navigation])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadData().then().catch(e => console.log(e))
        })
        return unsubscribe
    }, [])

    useEffect(() => {
        loadData().then().catch(e => console.log(e))
    }, [props.appState])

    async function loadData() {
        try{
            const tasksObj = await taskService.listMyCards({
                limit: 50,
            })

            setNoMoreCards(false)
            setCardList(tasksObj)
            if(tasksObj.length === 0) {
                setNoMoreCards(true)
            }
        }catch (e) {
            console.log(e)
            Alert.alert(e)
        }
    }

    async function onRightSwiped(cardIndex) {
        try{
            const card = cardList[cardIndex]
            await taskService.applyTask({
                taskId: card.id
            })
        } catch (e) {
            console.log(e)
            Alert.alert(e)
        }
    }

    async function onLeftSwiped(cardIndex) {
        try{
            const card = cardList[cardIndex]
            await taskService.passTask({
                taskId: card.id
            })
        } catch (e) {
            console.log(e)
        }
    }
    async function onRightPressed() {
        try{
            swiperRef.current.swipeRight()
        } catch (e) {
            console.log(e)
        }
    }

    async function onLeftPressed() {
        swiperRef.current.swipeLeft()
    }

    async function onSwipedAll() {
        try{
            setNoMoreCards(true)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                noMoreCards ?
                    <View style={styles.waitContainer}>
                        <Lottie
                            style={{height: 300, width: 300, alignSelf: 'center', marginTop: 5}}
                            source={waitAnim}
                            autoPlay
                            loop
                        />
                        <Text style={styles.text}>
                            There will be more tasks and jobs available soon. {'\n'}
                            Stay tuned!
                        </Text>
                    </View>
                    :
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
                    onSwipedRight={(e) => {onRightSwiped(e).then(r => {}).catch(e => console.log(e))}}
                    onSwipedLeft={(e) => {onLeftSwiped(e).then(r => {}).catch(e => console.log(e))}}
                    onSwiped={(cardIndex) => {}}
                    onSwipedAll={() => {onSwipedAll().then(r => {}).catch(e => console.log(e))}}
                    backgroundColor={Colors.light.grey}
                    infinite={false}
                    containerStyle={{top: 0, width: '100%'}}
                    cardStyle={{top: 5, left: '2%', width: '96%', justifyContent: 'center',}}
                    stackSize= {2}
                    showSecondCard={true}
                    useViewOverflow={false}
                >

                </Swiper>
            }
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
    },
    waitContainer: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
    },
    text: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 22,
        marginTop: 20,
    }
}
