import { StyleSheet } from 'react-native';
import Colors from "../../../constants/Colors";
import {ScreenWidth} from "react-native-elements/dist/helpers";

const styles = StyleSheet.create({
    container: {
        // marginTop: 60,
        paddingVertical: 60,
        padding: 20,
        height: '95%',
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    textInputContainer:{
        width: ScreenWidth - 100,
        height: 40,
        borderRadius: 5,
        paddingStart: 5,
        backgroundColor: '#eaebf6'
    },
    closeButton: {
        width: '15%',
        marginLeft: 5,
        marginTop: 7,
        paddingEnd: 10,
    },
    closeText: {
        color: Colors.light.tint,
        justifyContent: 'center'
    },
    textInput: {
        fontSize: 20,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
    },
    iconContainer: {
        backgroundColor: '#e7e7e7',
        padding: 7,
        borderRadius: 10,
        marginRight: 15,
    },
    locationText: {

    }
});

export default styles;
