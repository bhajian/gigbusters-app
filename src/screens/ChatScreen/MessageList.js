import React, {useRef, useState} from 'react';
import {
    View,
    Image,
    ScrollView, Text, StyleSheet, FlatList, SafeAreaView,
} from 'react-native'
import {useNavigation} from "@react-navigation/native"
import loading2 from "../../../assets/images/loading2.gif";
import MessageItem from "../../components/MessageItem";
import tipoffs from "../../../assets/data/tipoffs";

export default function MessageListScreen() {
    const [dataBeingSaved, setDataBeingSaved] = useState(false)
    const [applicants, setApplicants] = useState([])
    const [dataBeingLoaded, setDataBeingLoaded] = useState(false)
    const navigation = useNavigation()

    async function onChatPressed(cardIndex) {
        navigation.navigate('ChatScreen')
    }

    async function onProfilePressed(params) {
        navigation.navigate('ReviewableProfileScreen', {reviewable: tipoffs[0]})
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                dataBeingLoaded ?
                    <Image source={loading2} style={styles.loading2} />
                    :
                    <FlatList
                        data={tipoffs}
                        renderItem={({item}) => {
                            return(
                                <MessageItem
                                    item={item}
                                    onChatPressed={onChatPressed}
                                    onProfilePressed={onProfilePressed}
                                />
                            )
                        }}
                        keyExtractor={(item) => item.userId}
                    />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#ffffff",
        alignItems: "stretch",
    },
    buttonContainer: {
        backgroundColor: "#ffffff",
        margin: 30
    },
    logo: {
        width: '100%',
        height: 500,
    },
    text:{
        textAlign: "center",
    },
    textLogo: {
        textAlign: "center",
        fontSize: 41,
        color: "#5B67CA"
    },
})
