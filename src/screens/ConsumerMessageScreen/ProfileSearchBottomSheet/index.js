import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Button, FlatList, Image, Pressable, StyleSheet, Text, View} from "react-native";
import {BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView} from "@gorhom/bottom-sheet";
import Feather from "react-native-vector-icons/Feather";
import loading2 from "../../../../assets/images/loading2.gif";
import {useNavigation} from "@react-navigation/native";
import ProfileListItem from "../../../components/ProfileListItem";
import {ProfileService} from "../../../backend/ProfileService";

export default function ProfileSearchBottomSheet({bottomSheetModalRef, handleSheetChanges}) {
    const [dataBeingLoaded, setDataBeingLoaded] = useState(false)
    const [profiles, setProfiles] = useState([])
    const snapPoints = useMemo(() => ['85%', '85%'], []);
    const navigation = useNavigation()
    const [backdropPressBehavior, setBackdropPressBehavior] = useState('close')
    const profileService = new ProfileService()

    const handleTogglePressBehavior = useCallback(() => {
        setBackdropPressBehavior(state => {
            switch (state) {
                case 'none':
                    return 'close';
                case 'close':
                    return 'collapse';
                case 'collapse':
                    return 'none';
            }
        });
    }, []);

    const handleExpandPress = useCallback(() => {
        bottomSheetModalRef.current?.expand();
    }, []);
    const handleCollapsePress = useCallback(() => {
        bottomSheetModalRef.current?.collapse();
    }, []);
    const handleClosePress = useCallback(() => {
        bottomSheetModalRef.current?.close()
    }, []);

    const renderBackdrop = useCallback(
        (props) => (
            <BottomSheetBackdrop {...props} pressBehavior={backdropPressBehavior} />
        ),
        [backdropPressBehavior]
    )

    useEffect(() => {
        loadData().then(r => {})
    }, [])

    async function loadData() {
        const profilesObj = await profileService.listProfiles({
            limit: 20,
        })
        setProfiles(profilesObj)
    }

    async function onProfilePressed(params) {
        navigation.navigate('ChatScreen')
        bottomSheetModalRef.current?.close()
    }

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                style={styles.sheetContainer}
                backdropComponent={renderBackdrop}
            >
                <BottomSheetView
                    style={styles.contentContainerStyle}
                    enableFooterMarginAdjustment={true}
                    style={styles.bottomSheetContentContainer}>
                    <View style={styles.titleContainer}>
                        <Pressable onPress={handleClosePress}>
                            <Feather name="x" size={25} style={styles.closeButton}/>
                        </Pressable>
                        <Text style={styles.title}>Search</Text>
                        <View></View>
                    </View>
                    <View style={styles.mainContainer}>
                        {
                            dataBeingLoaded ?
                                <Image source={loading2} style={styles.loading2} />
                                :
                                <FlatList
                                    data={profiles}
                                    renderItem={({item}) => {
                                        return(
                                            <ProfileListItem
                                                item={item}
                                                onProfilePressed={onProfilePressed}
                                            />
                                        )
                                    }}
                                    keyExtractor={(item) => item.userId}
                                />
                        }
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 75,
        paddingRight: 1,
    },
    titleContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
    },
    closeButton: {

    },
    mainContainer: {
        width: '100%',
        // flexDirection: 'column',
        // backgroundColor: 'red'
    },
    buttonContainer: {
        backgroundColor: '#fff',
        borderColor: '#bdb8b8',
        marginVertical: 10,
        marginHorizontal: 10,
        height: 120,
        borderWidth: 0,
        borderRadius: 15,
        padding: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    ratingText: {
        paddingVertical: 5,
        fontSize: 20,
        fontWeight: '500',
        textAlignVertical: 'bottom',
    },
    sheetContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        shadowColor: 'rgba(0,0,0,0.75)',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 2,
        shadowRadius: 16.0,
        elevation: 30,
    },
    bottomSheetContentContainer: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'flex-start',
        paddingHorizontal: 10
    },
    icons: {
        fontSize: 25,
        color: '#000',
    },
});
