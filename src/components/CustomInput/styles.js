import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5,
        flexDirection: 'row',
    },
    icon: {
        padding: 0,
        color: '#b8b8b8',
        fontSize: 20,
    },
    input: {
        flex: 1,
        paddingLeft: 5,
    }
});

export default styles;
