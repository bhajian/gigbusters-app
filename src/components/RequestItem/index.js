import React, {useCallback, useRef} from "react";
import {Image, Pressable, Share, StyleSheet, View} from "react-native";
import PhotoContainer from "./PhotoContainer";
import IdContainer from "./IdContainer";
import MainContainer from "./MainContainer";
import Footer from "./Footer";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";

export default function RequestItem({request}) {

    const ref = useRef()

    // const onCapture = useCallback(uri => {
    //     console.log("do something with ", uri);
    // }, [])

    async function onSharePressed() {
        ref.current.capture().then(uri => {
            Sharing.shareAsync(`file://${uri}`, {
                dialogTitle: 'Share to social media',

            })
        })
    }

    return (
        <ViewShot ref={ref} options={{ fileName: "Your-File-Name", format: "jpg", quality: 0.9 }}>
            <View style={styles.container}>
                <Pressable >
                    <View style={styles.topContainer}>
                        <PhotoContainer
                            profile={request}
                        />
                        <IdContainer
                            request={request}
                        />
                    </View>
                    <View style={styles.mainContainer}>
                        <MainContainer
                            request={request}
                        />
                    </View>
                </Pressable>
                <Footer
                    review={request}
                    onSharePressed={onSharePressed}
                />
            </View>
        </ViewShot>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        borderBottomWidth: 0.5,
        borderColor: 'grey'
    },
    mainContainer: {
        width: '100%',
        padding: 5,
        borderColor: 'grey'
    },
    topContainer: {
        flexDirection: 'row',
        width: '100%',
        padding: 5,
        borderColor: 'grey'
    }
});
