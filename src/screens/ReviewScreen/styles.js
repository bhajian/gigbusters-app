import {StyleSheet, Dimensions} from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
    },
    searchBarContainer: {
        flexDirection: "row",
        // justifyContent: 'space-between',
        // height: 75,
        // borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
        // paddingBottom: 2,
        backgroundColor: 'white',
    },
    searchInput: {
        flexDirection: "row",
        paddingTop: 7,
        paddingLeft: 7,
        marginHorizontal: 7,
        width: '80%',
        backgroundColor: '#eae8e8',
        borderRadius: 10,
    },
    searchButton: {
        marginTop: 10,
        marginLeft: 5,
        maxWidth: '12%'
    },
    contentContainer: {
        backgroundColor: '#ffffff',
        height: '100%'
    },
    iconContainer: {
        // marginTop: 1,
        borderWidth: 1,
        width: 30,
        height: 30,
        borderColor: "grey",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid'
    },
});

export default styles;
