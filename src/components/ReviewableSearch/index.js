import React, {useMemo, useState} from "react";
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {BottomSheetModal, BottomSheetModalProvider, BottomSheetView} from "@gorhom/bottom-sheet";

export default function ReviewableSearch({bottomSheetModalRef, handleSheetChanges}) {

    const snapPoints = useMemo(() => ['25%', '70%'], []);
    const [enablePanDownToClose, setEnablePanDownToClose] = useState(true);
    const [enableDismissOnClose, setEnableDismissOnClose] = useState(true);


    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                style={styles.sheetContainer}
            >
                <BottomSheetView
                    style={styles.contentContainerStyle}
                    enableFooterMarginAdjustment={true}
                    style={styles.bottomSheetContentContainer}>

                    <Text>Awesome 🎉</Text>

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
    sheetContainer: {
        marginHorizontal: 6,
        backgroundColor: 'white',
        borderRadius: 16,
        shadowColor: 'rgba(0,0,0,0.25)',
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
