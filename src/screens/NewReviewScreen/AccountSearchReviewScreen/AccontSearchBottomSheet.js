import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Pressable,
} from 'react-native';

import {BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView} from "@gorhom/bottom-sheet";
import Colors from "../../../constants/Colors";
import Feather from "react-native-vector-icons/Feather";
import AccountSearchReviewScreen from "./index";

export default function AccontSearchBottomSheet({bottomSheetModalRef, handleSheetChanges}) {
    const [value, setValue] = React.useState('phone')
    const [backdropPressBehavior, setBackdropPressBehavior] = useState('close')


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
    const snapPoints = useMemo(() => ['25%', '80%'], []);

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
                        <AccountSearchReviewScreen />
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
        // marginHorizontal: 6,
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

    },
    icon: {

        fontSize: 20,
        color: Colors.light.tint
    }
});
