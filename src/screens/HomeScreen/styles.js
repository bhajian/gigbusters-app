import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        height: '100%'
    },
    criteriaContainer: {
        backgroundColor: '#ffffff',
        borderBottomColor: '#bdb8b8',
        borderBottomWidth: 2,
        padding: 10,
    },
    activityContainer: {
        marginTop: 30,
        backgroundColor: '#ffffff',
        borderColor: '#d3cfcf',
        marginHorizontal: 15,
        height: 200,
        borderWidth: 2,
        borderRadius: 15,
        padding: 5,
    },
    sliderContainer: {
        marginTop: 30,
        backgroundColor: '#ffffff',
        borderColor: '#bdb8b8',
        marginHorizontal: 15,
        height: 80,
        borderWidth: 0,
        borderRadius: 15,
        padding: 5,
    },
    locationContainer: {
        marginTop: 5,
        backgroundColor: '#ffffff',
        borderColor: '#bdb8b8',
        marginHorizontal: 10,
        height: 120,
        borderWidth: 0,
        borderRadius: 15,
        padding: 5,
    },
    image: {
        width: '100%',
        height: 500,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    title: {
        fontSize: 70,
        fontWeight: 'bold',
        color: 'white',
        width: '70%',
        marginLeft: 25,
    },
    button: {
        backgroundColor: 'white',
        width: 200,
        height: 40,
        borderRadius: 10,
        marginTop: 15,
        marginLeft: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    searchButton: {
        backgroundColor: '#e5e0e0',
        width: Dimensions.get('screen').width - 20,
        height: 50,

        borderRadius: 10,
        marginHorizontal: 10,
        // paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 100
    },
    searchButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        marginTop: 10,
        zIndex: 1
    },
});

export default styles;
