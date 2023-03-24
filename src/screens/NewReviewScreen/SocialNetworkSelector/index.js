import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Pressable,
} from 'react-native';

import {BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView} from "@gorhom/bottom-sheet";
import {RadioButton} from "react-native-paper";
import Colors from "../../../constants/Colors";
import {FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";

export default function SocialNetworkSelector({bottomSheetModalRef, handleSheetChanges}) {
    const [value, setValue] = React.useState('gigbuster')
    const [backdropPressBehavior, setBackdropPressBehavior] = useState('close')

    const radioChange = useCallback((value) => {
        setValue(value)
        handleSheetChanges(value)
    }, []);

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

    const handleClosePress = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);

    const renderBackdrop = useCallback(
        (props) => (
            <BottomSheetBackdrop {...props} pressBehavior={backdropPressBehavior} />
        ),
        [backdropPressBehavior]
    );

    useEffect(() => {

    }, []);

    // variables
    const snapPoints = useMemo(() => ['90%', '90%'], []);

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                // onChange={handleSheetChanges}
                style={styles.sheetContainer}
                backdropComponent={renderBackdrop}
            >
                <BottomSheetView
                    enableFooterMarginAdjustment={true}
                    style={styles.bottomSheetContentContainer}>
                    <View style={styles.titleContainer}>
                        <Pressable onPress={handleClosePress}>
                            <Feather name="x" size={25} style={styles.closeButton}/>
                        </Pressable>
                        <Text style={styles.title}>Reviewable Type</Text>
                        <View></View>
                    </View>
                    <View style={styles.mainContainer}>
                        <RadioButton.Group
                            onValueChange={radioChange}
                            value={value}
                        >
                            <View style={styles.radioRow}>
                                <MaterialCommunityIcons
                                    style={styles.icon}
                                    name={"orbit"}
                                />
                                <RadioButton.Item label="Gigbuster" value="gigbuster" style={styles.radioButton} />
                            </View>
                            <View style={styles.radioRow}>
                                <Entypo
                                    style={styles.icon}
                                    name={"phone"}
                                />
                                <RadioButton.Item label="Phone" value="phone" style={styles.radioButton} />
                            </View>
                            <View style={styles.radioRow}>
                                <Entypo
                                    style={styles.icon}
                                    name={"instagram"}
                                />
                                <RadioButton.Item label="Instagram" value="instagram" style={styles.radioButton} />
                            </View>
                            <View style={styles.radioRow}>
                                <FontAwesome5
                                    style={styles.icon}
                                    name={"tiktok"}
                                />
                                <RadioButton.Item label="Tiktok" value="tiktok" style={styles.radioButton}/>
                            </View>
                            <View style={styles.radioRow}>
                                <FontAwesome5
                                    style={styles.icon}
                                    name={"twitter"}
                                />
                                <RadioButton.Item label="Twitter" value="twitter" style={styles.radioButton}/>
                            </View>
                            <View style={styles.radioRow}>
                                <FontAwesome5
                                    style={styles.icon}
                                    name={"linkedin"}
                                />
                                <RadioButton.Item label="Linkedin" value="linkedin" style={styles.radioButton}/>
                            </View>
                            <View style={styles.radioRow}>
                                <FontAwesome5
                                    style={styles.icon}
                                    name={"facebook"}
                                />
                                <RadioButton.Item label="Facebook" value="facebook" style={styles.radioButton}/>
                            </View>
                            <View style={styles.radioRow}>
                                <MaterialCommunityIcons
                                    style={styles.icon}
                                    name={"web"}
                                />
                                <RadioButton.Item label="Web" value="web" style={styles.radioButton}/>
                            </View>
                        </RadioButton.Group>
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
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
        width: '100%'
    },
    radioRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    radioButton: {
        fontWeight: '500',
        width: 350,
        // backgroundColor: 'green',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // flex: 4
    },
    icon: {
        // marginRight: 3,
        fontSize: 20,
        color: Colors.light.tint
    }
});
