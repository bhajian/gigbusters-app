import React, {useCallback, useMemo, useState} from "react";
import {Button, Image, Pressable, StyleSheet, Text, View} from "react-native";
import {BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView} from "@gorhom/bottom-sheet";
import Feather from "react-native-vector-icons/Feather";
import ChoiceSelector from "../../../components/ChoiceSelector";
import {Slider} from '@miblanchard/react-native-slider'
import Colors from "../../../constants/Colors";
import {LocationSelector} from "../../../components/LocationSearch";
import { Rating, AirbnbRating } from 'react-native-ratings'
import STAR_IMAGE from '../../../../assets/images/star.png'

export default function MatchingSearch({bottomSheetModalRef, handleSheetChanges}) {

    const snapPoints = useMemo(() => ['80%', '80%'], [])
    const [enablePanDownToClose, setEnablePanDownToClose] = useState(true)
    const [enableDismissOnClose, setEnableDismissOnClose] = useState(true)
    const [locationMax, setLocationMax] = useState(50)
    const [priceMin, setPriceMin] = useState(20)
    const [backdropPressBehavior, setBackdropPressBehavior] = useState('close')

    const handleTogglePressBehavior = useCallback(() => {
        console.log('I am toggled')
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
        bottomSheetModalRef.current?.close();
    }, []);

    const renderBackdrop = useCallback(
        (props) => (
            <BottomSheetBackdrop {...props} pressBehavior={backdropPressBehavior} />
        ),
        [backdropPressBehavior]
    )

    function getCategorySelectedValue(value){

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
                        <Text style={styles.title}>Search Filter</Text>
                        <View></View>
                    </View>
                    <View style={styles.mainContainer}>
                        <ChoiceSelector passSelectedValue={getCategorySelectedValue}/>
                        <View style={styles.priceContainer}>
                            <Text>Min Price: {priceMin} </Text>
                            <Slider
                                value={locationMax}
                                onValueChange={value => setPriceMin(value)}
                                step={1}
                                maximumValue={150}
                                minimumValue={1}
                                minimumTrackTintColor={Colors.light.tint}
                                thumbTintColor={Colors.light.turquoise}
                            />
                        </View>
                        <View style={styles.locationContainer}>
                            <Text>Within: {locationMax} km of  </Text>
                            <Slider
                                value={locationMax}
                                onValueChange={value => setLocationMax(value)}
                                step={1}
                                maximumValue={150}
                                minimumValue={1}
                                minimumTrackTintColor={Colors.light.tint}
                                thumbTintColor={Colors.light.turquoise}
                            />
                            <LocationSelector />
                        </View>
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
    },
    locationContainer: {
        backgroundColor: '#fff',
        borderColor: '#bdb8b8',
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 15,
    },
    priceContainer: {
        marginTop: 5,
        marginHorizontal: 10,
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
