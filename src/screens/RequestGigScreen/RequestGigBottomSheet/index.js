import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Button, Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView} from "@gorhom/bottom-sheet";
import Feather from "react-native-vector-icons/Feather"
import CategorySelector from "../../../components/CategorySelector";
import {Slider} from "@miblanchard/react-native-slider";
import Colors from "../../../constants/Colors";
import {LocationSelector} from "../../../components/LocationSearch";
import CustomButton from "../../../components/CustomButton";

export default function GigRequestBottomSheet({
                                                  bottomSheetModalRef,
                                                  handleSheetChanges,
                                                  getValueFromBottomSheet,
                                                  defaultData
                                              }) {

    const snapPoints = useMemo(() => ['80%', '80%'], [])
    const [category, setCategory] = useState('')
    const [location, setLocation] = useState(defaultData.location?
        defaultData.location : {})
    const [distance, setDistance] = useState([50])
    const [price, setPrice] = useState([20])
    const [backdropPressBehavior, setBackdropPressBehavior] = useState('close');

    const handleTogglePressBehavior = useCallback(() => {
        getValueFromBottomSheet({
            location: location,
            category: category,
            distance: distance[0],
            price: price[0],
        })
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
        bottomSheetModalRef.current?.expand()
    }, [])

    const handleCollapsePress = useCallback(() => {
        getValueFromBottomSheet({
            location: location,
            category: category,
            distance: distance[0],
            price: price[0],
        })
        bottomSheetModalRef.current?.collapse()
    }, [])

    const handleClosePress = useCallback(() => {
        bottomSheetModalRef.current?.close()
    }, [])

    const renderBackdrop = useCallback(
        (props) => (
            <BottomSheetBackdrop {...props} pressBehavior={backdropPressBehavior} />
        ),
        [backdropPressBehavior]
    )

    const selectPressed = useCallback((value) => {
        getValueFromBottomSheet({
            location: location,
            category: category,
            distance: distance[0],
            price: price[0],
        })
        bottomSheetModalRef.current?.close()

    }, [location, category, distance, price]);

    const cancelPressed = useCallback((value) => {
        bottomSheetModalRef.current?.close()
    }, [])

    function getCategorySelectedValue(value){
        setCategory(value)
    }

    const onLocationChangePressed = async(props) => {
        setLocation(props)
    }

    useEffect(() => {
        setLocation(defaultData.location)
    }, [defaultData])

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
                        <Pressable onPress={selectPressed}>
                            <Feather name="x" size={25} style={styles.closeButton}/>
                        </Pressable>
                        <Text style={styles.title}>Search Filter</Text>
                        <View></View>
                    </View>
                        <KeyboardAvoidingView style={styles.mainContainer}>
                            <View style={styles.criteriaContainer}>
                                <View style={styles.doubleButton}>
                                    <CustomButton
                                        text="Cancel"
                                        onPress={selectPressed}
                                        style={styles.selectButton}
                                        bgColor={Colors.light.grey}
                                        fgColor="black"
                                    />
                                    <CustomButton
                                        text="Select"
                                        onPress={selectPressed}
                                        style={styles.selectButton}
                                        bgColor={Colors.light.tint}
                                        fgColor="white"
                                    />
                                </View>
                                <CategorySelector
                                    passSelectedValue={getCategorySelectedValue}
                                />
                                <View style={styles.locationContainer}>
                                    <Text>Within: {distance} km of </Text>
                                    <Slider
                                        value={distance}
                                        onValueChange={value => setDistance(value)}
                                        step={1}
                                        maximumValue={150}
                                        minimumValue={1}
                                        minimumTrackTintColor={Colors.light.tint}
                                        thumbTintColor={Colors.light.turquoise}
                                    />
                                    <LocationSelector
                                        locationNameParam={location?.locationName}
                                        onLocationChangePressed={onLocationChangePressed}
                                        style={{marginTop: 10}}
                                    />
                                </View>
                                <View style={styles.sliderContainer}>
                                    <Text>Price/hr: {price} $$ </Text>
                                    <Slider
                                        value={price}
                                        onValueChange={setPrice}
                                        step={1}
                                        maximumValue={150}
                                        minimumValue={1}
                                        minimumTrackTintColor={Colors.light.tint}
                                        thumbTintColor={Colors.light.turquoise}
                                    />
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}

const styles = StyleSheet.create({

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
        // width: '100%',
        marginHorizontal: 10
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
    doubleButton: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    selectButton:{
        width: '48%',
        height: 45
    },
});
