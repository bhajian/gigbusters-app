import React, {useState} from 'react';
import {Text, ImageBackground, View, StyleSheet} from 'react-native';
import UserAvatar from "@muhzi/react-native-user-avatar";
import Colors from "../../constants/Colors";
import MapView from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps"

const WorkerTask = props => {
    const {
        photoURL,
        description,
        category,
        price,
        priceUnit,
        city,
        country,
        location
    } = props.task
    const {
        name,
        profilePhotoURL
    } = props.customer


    const [mapRegion, setmapRegion] = useState({
        latitude: location?.latitude,
        longitude: location?.longitude,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
    })


    return (
        <View style={styles.card}>
            <View style={styles.topContainer}>
                <UserAvatar
                    size={45}
                    active
                    src={profilePhotoURL}
                    backgroundColor={Colors.light.turquoise}
                    userName={name}
                    fontSize={20}
                />
                <Text style={styles.contactName}>{name}</Text>
            </View>
            <View style={styles.contentContainer}>
                <ImageBackground
                    source={{
                        uri: photoURL,
                    }}
                    style={styles.image}>
                    <View style={styles.cardInner}>
                        <Text style={styles.name}>{category}</Text>
                    </View>

                    <View style={styles.parentButtonsContainer}>

                    </View>
                </ImageBackground>

                <View style={styles.infoContainer}>
                    <View style={styles.tagsContainer}>
                        <View style={styles.tag}>
                            <Text style={styles.text} >{city}</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={styles.text} >{price}$/{priceUnit}</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={styles.text} >{category}</Text>
                        </View>
                    </View>
                    <Text style={styles.description}>
                        {description}
                    </Text>
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <MapView
                    style={{ width: '100%', height: '100%', alignSelf: 'center'}}
                    region={mapRegion}
                    provider={PROVIDER_GOOGLE}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: '#fefefe',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 55,
    },
    connectButton: {
        backgroundColor: Colors.light.tint,
        borderRadius: 5,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginHorizontal: 5,
    },
    rejectButton: {
        backgroundColor: Colors.light.tint,
        borderRadius: 5,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    parentButtonsContainer: {
        // position: 'absolute',
        // top: 180
    },
    buttonsContainer: {
        alignSelf: 'center',
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute', //Here is the trick
        bottom: 30, //Here is the trick
    },
    topContainer: {
        padding: 10,
        flexDirection: 'row',
    },
    contactName: {
        margin: 5,
        paddingTop: 5,
        paddingLeft: 10,
        textAlignVertical: 'bottom',
        fontSize: 20,
        fontWeight: '500',
    },
    contentContainer: {
        width: '95%',
        alignSelf: 'center',
        height: '100%',
    },
    image: {
        width: '100%',
        height: 250,
        // borderRadius: 15,
        // borderWidth: 0.5,
        // overflow: 'hidden',
    },
    cardInner: {
        padding: 10,
        marginBottom: 80,
    },
    name: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowRadius: 10,
        textShadowOffset: {
            width: 2,
            height: 2
        }
    },
    bio: {
        fontSize: 18,
        color: 'white',
        lineHeight: 25,
    },
    tagsContainer: {
        paddingVertical: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    infoContainer: {
        padding: 5,
        justifyContent: 'flex-start',
        alignContent: 'flex-start'
    },
    tag: {
        borderRadius: 10,
        backgroundColor: Colors.light.tint,
        marginHorizontal: 2
    },
    text: {
        paddingHorizontal: 4,
        paddingVertical: 4,
        marginHorizontal: 4,
        marginTop: 1,
        marginBottom: 2,
        color: '#fff',
    },
    description: {
        fontSize: 18,
    }
});

export default WorkerTask;