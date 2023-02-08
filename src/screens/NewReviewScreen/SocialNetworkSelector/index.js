import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text, TextInput, Button,
} from 'react-native';

import {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {RadioButton} from "react-native-paper";
import RadioGroup from "react-native-radio-buttons-group";
import Colors from "../../../constants/Colors";

export default function SocialNetworkSelector({bottomSheetModalRef, handleSheetChanges}) {
    const [value, setValue] = React.useState('first');


    useEffect(() => {

    }, []);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <View style={styles.bottomSheetContentContainer}>
                    <RadioButton.Group onValueChange={setValue} value={value}>
                        <View style={styles.radioRow}>
                            <RadioButton.Android value="first" />
                            <Text style={styles.radioText}>First</Text>
                        </View>
                        <View style={styles.radioRow}>
                            <RadioButton.Android value="second" />
                            <Text>Second</Text>
                        </View>
                    </RadioButton.Group>
                </View>
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
    bottomSheetContentContainer: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'flex-start',
        paddingHorizontal: 10
    },
    radioRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    radioText: {
        fontWeight: '500'
    }
});
