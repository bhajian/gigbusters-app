import React, {useCallback, useMemo, useState} from "react";
import {Button, Image, Pressable, StyleSheet, Text, View} from "react-native";
import {BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView} from "@gorhom/bottom-sheet";
import Fontisto from "react-native-vector-icons/Fontisto";
import Feather from "react-native-vector-icons/Feather";
import ChoiceSelector from "../ChoiceSelector";
import Slider from "@react-native-community/slider";
import Colors from "../../constants/Colors";
import {LocationSelector} from "../LocationSearch";
import {RatingBar} from "@aashu-dubey/react-native-rating-bar";
import {Icon} from "react-native-elements";

export default function ReviewableSearch({bottomSheetModalRef, handleSheetChanges}) {

    const snapPoints = useMemo(() => ['25%', '70%'], []);
    const [enablePanDownToClose, setEnablePanDownToClose] = useState(true);
    const [enableDismissOnClose, setEnableDismissOnClose] = useState(true);
    const [locationMax, setLocationMax] = useState(50);
    const [rating, setRating] = useState(3);
    const [backdropPressBehavior, setBackdropPressBehavior] = useState('close');

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
    );

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
                        <ChoiceSelector/>
                        <View style={styles.locationContainer}>
                            <Text>Within: {locationMax} km of  </Text>
                            <Slider
                                value={locationMax}
                                onValueChange={setLocationMax}
                                step={1}
                                minimumTrackTintColor={Colors.light.tint}
                                maximumValue={150}
                                minimumValue={1}
                                thumbStyle={{ height: 30, width: 30, backgroundColor: Colors.light.tint }}
                                // trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                            />
                            <LocationSelector />
                        </View>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.ratingText}>Rating: </Text>
                            <RatingBar
                                initialRating={3}
                                minRating={1}
                                direction="horizontal"
                                unratedColor={Colors.light.grey}
                                itemCount={5}
                                itemPadding={1}
                                itemSize={30}
                                itemBuilder={() => <Icon name="star" color={Colors.light.tint} size={30} />}
                                onRatingUpdate={setRating}
                            />
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
        flexDirection: 'column',
        // backgroundColor: 'red'
    },
    locationContainer: {
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
        marginHorizontal: 6,
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
