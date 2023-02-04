import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        height: '100%'
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
